require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize, User, Room, Message } = require("./models");
const WebSocket = require("ws");

const app = express();
const wss = new WebSocket.Server({ port: 8080 });

app.use(cors());
app.use(express.json());

// Rotas de autenticação
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const messageRoutes = require("./routes/message");
app.use("/chat", messageRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

// Lista de usuários conectados via WebSocket
let onlineUsers = {};

// Função para enviar lista de usuários online
const broadcastOnlineUsers = async () => {
  try {
    // Consultar usuários com isOnline: true no banco
    const users = await User.findAll({
      where: { isOnline: true },
      attributes: ["id", "username"], // Apenas campos necessários
    });

    // Enviar lista para todos os WebSockets conectados
    Object.values(onlineUsers).forEach((ws) => {
      ws.send(
        JSON.stringify({
          type: "onlineUsers",
          users,
        })
      );
    });
  } catch (error) {
    console.error("Erro ao obter lista de usuários online:", error);
  }
};

// Função para gerenciar ping/pong
const handlePingPong = () => {
  for (const userId in onlineUsers) {
    const ws = onlineUsers[userId];

    if (!ws.isAlive) {
      // Cliente não respondeu ao ping, considere desconectado
      delete onlineUsers[userId];
      User.update({ isOnline: false }, { where: { id: userId } });
      console.log(`Usuário ${userId} foi desconectado por inatividade.`);
    } else {
      ws.isAlive = false; // Resetar estado e enviar ping
      ws.ping();
    }
  }
};

// Intervalo para verificar conexões ativas
const pingInterval = 30000; // 30 segundos
setInterval(handlePingPong, pingInterval);

// Configuração do WebSocket
wss.on("connection", (ws) => {
  console.log("Novo cliente conectado!");

  ws.isAlive = true; // Inicializar estado como ativo

  ws.on("pong", () => {
    ws.isAlive = true; // Cliente respondeu ao ping
  });

  ws.on("message", async (message) => {
    const data = JSON.parse(message);

    // Usuário entra online
    if (data.type === "online") {
      const { userId } = data;

      if (!userId) {
        console.error("userId não foi enviado corretamente.");
        return;
      }

      // Adicionar o WebSocket ao mapa de usuários online
      onlineUsers[userId] = ws;

      // Atualizar isOnline no banco de dados
      await User.update({ isOnline: true }, { where: { id: userId } });
      console.log(`Usuário ${userId} está online.`);

      // Atualizar lista de usuários online
      broadcastOnlineUsers();
    }

    // Envio de mensagem
    if (data.type === "message") {
      const { senderId, targetId, content } = data;

      try {
        // Verificar ou criar sala
        let room = await Room.findOne({
          where: {
            name: `Room-${Math.min(senderId, targetId)}-${Math.max(
              senderId,
              targetId
            )}`,
          },
        });

        if (!room) {
          room = await Room.create({
            name: `Room-${Math.min(senderId, targetId)}-${Math.max(
              senderId,
              targetId
            )}`,
            userId: senderId,
          });
          console.log(`Sala criada: ${room.name}`);
        }

        // Salvar mensagem no banco
        const newMessage = await Message.create({
          content,
          userId: senderId,
          roomId: room.id,
        });

        console.log(`Mensagem salva no banco: ${content}`);

        // Enviar mensagem para o destinatário
        const targetSocket = onlineUsers[targetId];
        if (targetSocket) {
          targetSocket.send(
            JSON.stringify({
              type: "message",
              message: {
                id: newMessage.id,
                content: newMessage.content,
                senderId: newMessage.userId,
                roomId: newMessage.roomId,
                createdAt: newMessage.createdAt,
              },
            })
          );
          console.log(`Mensagem enviada para o usuário ${targetId}`);
        }
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  });

  ws.on("close", async () => {
    console.log("Cliente desconectado.");
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === ws) {
        delete onlineUsers[userId];

        // Atualizar estado no banco
        await User.update({ isOnline: false }, { where: { id: userId } });
        console.log(`Usuário ${userId} desconectou.`);
      }
    }

    // Atualizar lista de usuários online
    broadcastOnlineUsers();
  });
});

// Iniciar o servidor
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida.");
    console.log("Servidor rodando na porta 3000.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
});

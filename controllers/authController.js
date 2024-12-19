const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
  async register(req, res) {
    const { name, username, password } = req.body;

    try {
      // Verificar se o nome de usuário já existe
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "O nome de usuário já está em uso." });
      }

      // Criar novo usuário
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        username,
        password: hashedPassword,
      });

      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso!", user: newUser });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }
  },
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Verificar se o usuário existe
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      // Gerar o token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Atualizar isOnline para true
      await User.update({ isOnline: true }, { where: { id: user.id } });

      return res.status(200).json({
        token,
        userId: user.id,
        username: user.username,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ error: "Erro no servidor" });
    }
  },

  async logout(req, res) {
    const { userId } = req.body;

    try {
      // Atualizar isOnline para false
      await User.update({ isOnline: false }, { where: { id: userId } });
      return res.status(200).json({ message: "Logout bem-sucedido" });
    } catch (error) {
      console.error("Erro no logout:", error);
      return res.status(500).json({ error: "Erro no servidor" });
    }
  },
};

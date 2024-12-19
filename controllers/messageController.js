const { Message, Room } = require("../models");

module.exports = {
  async getMessages(req, res) {
    const { userId, targetId } = req.query;

    try {
      // Procurar a sala correspondente aos dois usuários
      const room = await Room.findOne({
        where: {
          name: `Room-${Math.min(userId, targetId)}-${Math.max(
            userId,
            targetId
          )}`,
        },
      });

      if (!room) {
        return res.status(404).json({ error: "Sala não encontrada." });
      }

      // Buscar mensagens dessa sala
      const messages = await Message.findAll({
        where: { roomId: room.id },
        order: [["createdAt", "ASC"]],
      });

      return res.status(200).json(messages);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      return res.status(500).json({ error: "Erro ao buscar mensagens." });
    }
  },
};

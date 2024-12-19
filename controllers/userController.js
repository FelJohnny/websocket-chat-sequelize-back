const { User } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "isOnline"], // Pega apenas os campos necessários
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  },
};

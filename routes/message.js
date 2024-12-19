const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Rota para buscar mensagens
router.get("/messages", messageController.getMessages);

module.exports = router;

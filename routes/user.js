const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rota para buscar todos os usuários
router.get("/users", userController.getAllUsers);

module.exports = router;

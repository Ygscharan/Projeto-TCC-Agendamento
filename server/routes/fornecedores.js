const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

// Rota para obter todos os fornecedores
router.get('/', fornecedorController.getFornecedores);

// Rota para criar um novo fornecedor
router.post('/', fornecedorController.addFornecedor);

module.exports = router;

const express = require('express');
const router = express.Router();
const notaFiscalController = require('../controllers/notaFiscalController');

// Rota para obter todas as notas fiscais
router.get('/', notaFiscalController.getNotasFiscais);

// Rota para cadastrar uma nova nota fiscal
router.post('/', notaFiscalController.addNotaFiscal);

module.exports = router;

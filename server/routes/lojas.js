// routes/lojas.js
const express = require('express');
const {
    getAllLojas,
    createLoja,
    getLojaById,
    updateLoja,
    deleteLoja
} = require('../controllers/lojaController');

const router = express.Router();

// Rota para listar todas as lojas
router.get('/', getAllLojas);

// Rota para criar uma nova loja
router.post('/', createLoja);

// Rota para obter uma loja específica pelo ID
router.get('/:id', getLojaById);

// Rota para atualizar uma loja
router.put('/:id', updateLoja);

// Rota para excluir uma loja
router.delete('/:id', deleteLoja);

module.exports = router;

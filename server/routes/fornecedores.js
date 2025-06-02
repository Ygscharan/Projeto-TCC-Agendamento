const express = require('express');
const { getAllFornecedores, createFornecedor } = require('../controllers/fornecedorController');
const router = express.Router();

// Rota para listar todos os fornecedores
router.get('/', async (req, res) => {
    try {
        const fornecedores = await getAllFornecedores();
        res.json(fornecedores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar fornecedores', error });
    }
});

// Rota para criar um novo fornecedor
router.post('/', async (req, res) => {
    try {
        const fornecedor = req.body;
        const novoFornecedor = await createFornecedor(fornecedor);
        res.status(201).json(novoFornecedor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar fornecedor', error });
    }
});

module.exports = router;
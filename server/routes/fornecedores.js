const express = require('express');
const router = express.Router();
const { getAllFornecedores, createFornecedor } = require('../controllers/fornecedorController');


router.get('/', async (req, res) => {
  try {
    const fornecedores = await getAllFornecedores();
    res.json(fornecedores);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar fornecedores' });
  }
});


router.post('/', async (req, res) => {
  try {
    const novoFornecedor = await createFornecedor(req.body);
    res.status(201).json(novoFornecedor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const { getAllNotasFiscais, createNotaFiscal } = require('../controllers/notaFiscalController');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const notasFiscais = await getAllNotasFiscais();
        res.json(notasFiscais);
    } catch (error) {
        console.error('Erro ao listar notas fiscais:', error);
        res.status(500).json({ message: 'Erro ao listar notas fiscais', error });
    }
});


router.post('/', async (req, res) => {
    try {
        const novaNotaFiscal = await createNotaFiscal(req.body);
        res.status(201).json(novaNotaFiscal);
    } catch (error) {
        console.error('Erro ao criar nota fiscal:', error);
        res.status(500).json({ message: 'Erro ao criar nota fiscal', error });
    }
});

module.exports = router;
const express = require('express');
const { getAllAgendamentos, createAgendamento, updateAgendamento, deleteAgendamento } = require('../controllers/agendamentoController');
const router = express.Router();

// Rota para listar todos os agendamentos
router.get('/', getAllAgendamentos);

// Rota para criar um novo agendamento
router.post('/', async (req, res) => {
    try {
        const agendamento = req.body;
        const novoAgendamento = await createAgendamento(agendamento);
        res.status(201).json(novoAgendamento);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar agendamento', error });
    }
});

// rota para atualizar um agendamento
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const agendamento = req.body;
        const agendamentoAtualizado = await updateAgendamento(id, agendamento);
        res.json(agendamentoAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar agendamento', error });
    }
});

// rota para deletar um agendamento 
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteAgendamento(id);
        res.json({ message: 'Agendamento deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar agendamento', error });
    }
});

module.exports = router;
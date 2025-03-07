const Agendamento = require('../models/agendamento');

// Controlador para obter todos os agendamentos
const getAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.getAllAgendamentos();
        res.status(200).json(agendamentos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar agendamentos', error: err });
    }
};

// Controlador para criar um novo agendamento
const addAgendamento = async (req, res) => {
    try {
        const novoAgendamento = await Agendamento.createAgendamento(req.body);
        res.status(201).json({ message: 'Agendamento criado com sucesso', id: novoAgendamento.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar agendamento', error: err });
    }
};

// Controlador para atualizar o status de um agendamento
// falta alterar o status de pendente para cancelado ou confirmado
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { confirmado } = req.body;
        await Agendamento.updateAgendamentoStatus(id, confirmado);
        res.status(200).json({ message: 'Status atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar status', error: err });
    }
};

// Controlador para excluir um agendamento
const deleteAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        await Agendamento.deleteAgendamento(id);
        res.status(200).json({ message: 'Agendamento excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir agendamento', error: err });
    }
};

module.exports = { getAgendamentos, addAgendamento, updateStatus, deleteAgendamento };

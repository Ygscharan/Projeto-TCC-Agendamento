const Fornecedor = require('../models/fornecedor'); 
const Agendamento = require('../models/agendamento');

// listar agendamentos não esta funcionando
const getAllAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            include: [{
                model: Fornecedor,
                as: 'fornecedor_associado', // Alias correto
                attributes: ['nome', 'cnpj'],
            }]
        });
        res.json(agendamentos);
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        throw new Error('Erro ao listar agendamentos');
    }
};

// Função para criar um novo agendamento
const createAgendamento = async (agendamento) => {
    try {
        return await Agendamento.create(agendamento);
    } catch (error) {
        throw new Error('Erro ao criar agendamento');
    }
};
// Atualizar agendamento por ID
const updateAgendamento = async (id, dadosAtualizados) => {
    try {
        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) {
            throw new Error('Agendamento não encontrado');
        }
        await agendamento.update(dadosAtualizados);
        return agendamento;
    } catch (error) {
        throw new Error('Erro ao atualizar agendamento');
    }
};

// Deletar agendamento por ID
const deleteAgendamento = async (id) => {
    try {
        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) {
            throw new Error('Agendamento não encontrado');
        }
        await agendamento.destroy();
    } catch (error) {
        throw new Error('Erro ao deletar agendamento');
    }
};

module.exports = { getAllAgendamentos, createAgendamento, updateAgendamento, deleteAgendamento };

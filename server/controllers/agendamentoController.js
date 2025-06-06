const { Agendamento, Fornecedor, Loja } = require('../models');

// Buscar todos os agendamentos
const getAllAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll({
      include: [
        { model: Fornecedor, as: 'fornecedor' },
        { model: Loja, as: 'loja' }
      ]
    });
    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    res.status(500).json({ error: 'Erro ao listar agendamentos' });
  }
};

// Criar um novo agendamento
const createAgendamento = async (agendamento) => {
  try {
    return await Agendamento.create(agendamento);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error); // Mostrar erro real
    throw error; // Reenviar o erro real para o caller (rota, por exemplo)
  }
};

// Atualizar um agendamento existente
const updateAgendamento = async (id, dadosAtualizados) => {
  try {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado');
    }
    await agendamento.update(dadosAtualizados);
    return agendamento;
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    throw new Error('Erro ao atualizar agendamento');
  }
};

// Deletar um agendamento
const deleteAgendamento = async (id) => {
  try {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado');
    }
    await agendamento.destroy();
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    throw new Error('Erro ao deletar agendamento');
  }
};

module.exports = {
  getAllAgendamentos,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento
};

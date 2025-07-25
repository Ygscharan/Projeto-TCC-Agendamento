const { Agendamento, Fornecedor, Loja } = require('../models');


const getAllAgendamentos = async (req, res) => {
  try {
    const where = {};
    if (req.query.loja_id) {
      where.loja_id = req.query.loja_id;
    }
    const agendamentos = await Agendamento.findAll({
      where,
      include: [
        { model: Fornecedor, as: 'fornecedorAgendamento' },
        { model: Loja, as: 'loja' }
      ]
    });
    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error);
    res.status(500).json({ error: 'Erro ao listar agendamentos' });
  }
};

const getAgendamentosPorFornecedor = async (req, res) => {
  const { nomeFornecedor } = req.params;

  try {
    const fornecedor = await Fornecedor.findOne({ where: { nome: nomeFornecedor } });

    if (!fornecedor) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }

    const agendamentos = await Agendamento.findAll({
      where: { fornecedor_id: fornecedor.id },
      include: [
        { model: Fornecedor, as: 'fornecedorAgendamento' }, 
        { model: Loja, as: 'loja' }
      ],
      order: [['data_agendamento', 'ASC'], ['data_hora_inicio', 'ASC']]
    });

    res.json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos por fornecedor:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamentos por fornecedor' });
  }
};

const createAgendamento = async (agendamento) => {
  try {
    
    return await Agendamento.create(agendamento);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error;
  }
};


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
  getAgendamentosPorFornecedor,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento
};

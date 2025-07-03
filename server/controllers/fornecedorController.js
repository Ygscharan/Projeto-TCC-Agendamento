const Fornecedor = require('../models/fornecedor');


const getAllFornecedores = async () => {
  try {
    const fornecedores = await Fornecedor.findAll();
    return fornecedores;
  } catch (error) {
    throw new Error('Erro ao listar fornecedores');
  }
};


const createFornecedor = async (fornecedor) => {
  try {
    const { nome, cnpj, endereco, telefone } = fornecedor;

    
    if (!nome || !cnpj || !telefone) {
      throw new Error('Nome, CNPJ e telefone são obrigatórios');
    }

    
    const existente = await Fornecedor.findOne({ where: { cnpj } });
    if (existente) {
      throw new Error('Fornecedor com esse CNPJ já cadastrado');
    }

    const novoFornecedor = await Fornecedor.create({
      nome,
      cnpj,
      endereco,
      telefone,
    });

    return novoFornecedor;
  } catch (error) {
    console.error('Erro ao criar fornecedor:', error.message);
    throw new Error(error.message || 'Erro ao criar fornecedor');
  }
};

module.exports = { getAllFornecedores, createFornecedor };

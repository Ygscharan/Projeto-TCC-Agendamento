const Fornecedor = require('../models/fornecedor');

// função para listar todos os fornecedores
const getAllFornecedores = async () => {
    try {
        // Retorna todos os fornecedores utilizando Sequelize
        const fornecedores = await Fornecedor.findAll();
        return fornecedores;  // Retornando os dados corretamente
    } catch (error) {
        throw error;  // Lançando erro se houver falha
    }
};

// Função para criar fornecedor
const createFornecedor = async (fornecedor) => {
    try {
        const novoFornecedor = await Fornecedor.create(fornecedor);
        return novoFornecedor;
    } catch (error) {
        throw new Error('Erro ao criar fornecedor');
    }
};

module.exports = { getAllFornecedores, createFornecedor };
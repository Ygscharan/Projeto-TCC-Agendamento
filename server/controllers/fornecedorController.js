const Fornecedor = require('../models/fornecedor');

// Controlador para obter todos os fornecedores
const getFornecedores = async (req, res) => {
    try {
        const fornecedores = await Fornecedor.getAllFornecedores();
        res.status(200).json(fornecedores);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar fornecedores', error: err });
    }
};

// Controlador para criar um novo fornecedor
// precisa ainda colocar o email e a validação desses campos
const addFornecedor = async (req, res) => {
    const {nome, cnpj, endereco, telefone } = req.body;
    try {
        const fornecedor = { nome, cnpj, endereco, telefone };
        const result = await Fornecedor.createFornecedor(fornecedor);
        res.status(201).json({ message: 'Fornecedor criado com sucesso', result });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar fornecedor', error: err });
    }
};

module.exports = { getFornecedores, addFornecedor };

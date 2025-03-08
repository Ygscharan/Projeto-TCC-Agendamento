// controllers/lojaController.js
const Loja = require('../models/loja');

// Função para listar todas as lojas
const getAllLojas = async (req, res) => {
    try {
        const lojas = await Loja.findAll();
        res.json(lojas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar lojas', error });
    }
};

// Função para criar uma nova loja
const createLoja = async (req, res) => {
    try {
        const { nome, endereco, telefone } = req.body;
        const novaLoja = await Loja.create({ nome, endereco, telefone });
        res.status(201).json(novaLoja);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar loja', error });
    }
};

// Função para obter uma loja específica pelo ID
const getLojaById = async (req, res) => {
    try {
        const loja = await Loja.findByPk(req.params.id);
        if (loja) {
            res.json(loja);
        } else {
            res.status(404).json({ message: 'Loja não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar loja', error });
    }
};

// Função para atualizar uma loja
const updateLoja = async (req, res) => {
    try {
        const { nome, endereco, telefone } = req.body;
        const loja = await Loja.findByPk(req.params.id);
        if (loja) {
            loja.nome = nome || loja.nome;
            loja.endereco = endereco || loja.endereco;
            loja.telefone = telefone || loja.telefone;
            await loja.save();
            res.json(loja);
        } else {
            res.status(404).json({ message: 'Loja não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar loja', error });
    }
};

// Função para excluir uma loja
const deleteLoja = async (req, res) => {
    try {
        const loja = await Loja.findByPk(req.params.id);
        if (loja) {
            await loja.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Loja não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir loja', error });
    }
};

module.exports = {
    getAllLojas,
    createLoja,
    getLojaById,
    updateLoja,
    deleteLoja
};

const Loja = require('../models/loja');


const getAllLojas = async (req, res) => {
    try {
        const lojas = await Loja.findAll();
        res.json(lojas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar lojas', error });
    }
};


const createLoja = async (req, res) => {
    try {
        const { nome, endereco, telefone } = req.body;
        const novaLoja = await Loja.create({ nome, endereco, telefone });
        res.status(201).json(novaLoja);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar loja', error });
    }
};


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
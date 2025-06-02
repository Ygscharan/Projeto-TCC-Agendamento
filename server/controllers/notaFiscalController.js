const NotaFiscal = require('../models/notaFiscal');

// Função para listar todas as notas fiscais
const getAllNotasFiscais = async () => {
    try {
        const notasFiscais = await NotaFiscal.findAll();
        return notasFiscais;
    } catch (error) {
        console.error('Erro ao listar notas fiscais:', error);
        throw error;
    }
};

// Função para criar uma nova nota fiscal
const createNotaFiscal = async (notaFiscalData) => {
    try {
        const novaNotaFiscal = await NotaFiscal.create(notaFiscalData);
        return novaNotaFiscal;
    } catch (error) {
        console.error('Erro ao criar nota fiscal:', error);
        throw error;
    }
};

module.exports = { getAllNotasFiscais, createNotaFiscal };
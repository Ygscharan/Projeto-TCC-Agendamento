const NotaFiscal = require('../models/notaFiscal');

// Controlador para obter todas as notas fiscais
const getNotasFiscais = async (req, res) => {
    try {
        const notasFiscais = await NotaFiscal.getAllNotasFiscais();
        res.status(200).json(notasFiscais);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar notas fiscais', error: err });
    }
};

// Controlador para criar uma nova nota fiscal
const addNotaFiscal = async (req, res) => {
    const { fornecedor_id, numero_nf, data_emissao, xml_nf } = req.body;
    try {
        const notaFiscal = { fornecedor_id, numero_nf, data_emissao, xml_nf};
        const result = await NotaFiscal.createNotaFiscal(notaFiscal);
        res.status(201).json({ message: 'Nota fiscal cadastrada com sucesso', result });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar nota fiscal', error: err });
    }
};

module.exports = { getNotasFiscais, addNotaFiscal };

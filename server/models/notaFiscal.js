const db = require('../config/db');

// Função para listar todas as notas fiscais
const getAllNotasFiscais = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM notas_fiscais', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Função para adicionar uma nova nota fiscal
const createNotaFiscal = (notaFiscal) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO notas_fiscais (fornecedor_id, numero_nf, data_emissao, xml_nf) VALUES (?, ?, ?, ?)',
            [notaFiscal.fornecedor_id, notaFiscal.numero_nf, notaFiscal.data_emissao, notaFiscal.xml_nf],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

module.exports = { getAllNotasFiscais, createNotaFiscal };

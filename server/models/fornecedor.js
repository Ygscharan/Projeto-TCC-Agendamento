const db = require('../config/db');

// função para listar os fornecedores
const getAllFornecedores = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fornecedores', (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};

// função de adicionar um fornecedor
const createFornecedor = (fornecedor) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO fornecedores SET ?', fornecedor, (err, results) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};

// Exportando as funções
module.exports = { getAllFornecedores, createFornecedor };
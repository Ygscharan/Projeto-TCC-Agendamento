const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Agendamento = require('./agendamento');
const Fornecedor = require('./fornecedor');
const Loja = require('./loja');
const NotaFiscal = require('./notaFiscal');
const Usuario = require('./Usuario');

// Objeto com todos os models
const db = {
  Sequelize,
  sequelize,
  Agendamento,
  Fornecedor,
  Loja,
  NotaFiscal,
  Usuario,
};

// Definindo associações
Fornecedor.associate && Fornecedor.associate(db);
Loja.associate && Loja.associate(db);
Agendamento.associate && Agendamento.associate(db);

module.exports = db;

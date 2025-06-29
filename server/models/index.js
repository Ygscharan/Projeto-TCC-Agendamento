const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Importa os models
const Agendamento = require('./agendamento');
const Fornecedor = require('./fornecedor');
const Loja = require('./loja');
const NotaFiscal = require('./notaFiscal');
const Usuario = require('./Usuario');

// Cria o objeto `db`
const db = {
  Sequelize,
  sequelize,
  Agendamento,
  Fornecedor,
  Loja,
  NotaFiscal,
  Usuario,
};

// Aplica as associações (se existirem)
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;

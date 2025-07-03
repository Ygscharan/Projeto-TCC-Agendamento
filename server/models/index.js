const Sequelize = require('sequelize');
const sequelize = require('../config/db');


const Agendamento = require('./agendamento');
const Fornecedor = require('./fornecedor');
const Loja = require('./loja');
const NotaFiscal = require('./notaFiscal');
const Usuario = require('./Usuario');


const db = {
  Sequelize,
  sequelize,
  Agendamento,
  Fornecedor,
  Loja,
  NotaFiscal,
  Usuario,
};


Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;

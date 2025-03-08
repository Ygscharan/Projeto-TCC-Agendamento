const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Agendamento = require('./agendamento');

const Fornecedor = db.define('fornecedores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    timestamps: false
});

// Definindo a associação corretamente



module.exports = Fornecedor;

// models/loja.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Loja = sequelize.define('loja', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: true
    }
}, {
    timestamps: false
});

Loja.associate = function(models) {
    Loja.hasMany(models.Agendamento, { foreignKey: 'loja_id' });
};
module.exports = Loja;
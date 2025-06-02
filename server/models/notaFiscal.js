const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Agendamento = require('../models/agendamento');
const NotaFiscal = sequelize.define('NotaFiscal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero_nf: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    fornecedor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'fornecedores', 
            key: 'id'
        }
    },
    data_emissao: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    xml_nf: {
        type: DataTypes.TEXT,  
        allowNull: false
    }
}, {
    tableName: 'notas_fiscais',
    timestamps: false
});

NotaFiscal.hasMany(Agendamento, { foreignKey: 'nota_fiscal_id' });

module.exports = NotaFiscal;
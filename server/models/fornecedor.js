const { DataTypes } = require('sequelize');
const db = require('../config/db');

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
        validate: {
            is: /^[0-9]{14}$/ // Validar CNPJ com 14 dígitos
        }
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false
});

// Correto: definir a associação como função
Fornecedor.associate = (models) => {
    Fornecedor.hasMany(models.Agendamento, {
        foreignKey: 'fornecedor_id',
        as: 'agendamentos'
    });
};

module.exports = Fornecedor;
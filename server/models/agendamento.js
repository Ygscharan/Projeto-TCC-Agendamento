const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Agendamento = sequelize.define('agendamentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fornecedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'fornecedores',
            key: 'id'
        }
    },
    loja_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'lojas',
            key: 'id'
        }
    },
    nota_fiscal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'notas_fiscais',
            key: 'id'
        }
    },
    data_agendamento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pendente'
    },
    data_entrega: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    timestamps: false
});

// Definir as associações corretamente
Agendamento.associate = function(models) {
    Agendamento.belongsTo(models.Loja, { foreignKey: 'loja_id', as: 'loja_associada_agendamento' });  // Alias único
};

module.exports = Agendamento;

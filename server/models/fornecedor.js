const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Fornecedor = db.define('Fornecedor', {
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
      is: /^[0-9]{14}$/
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
  tableName: 'fornecedores',
  timestamps: false
});

Fornecedor.associate = (models) => {
  Fornecedor.hasMany(models.Agendamento, {
    foreignKey: 'fornecedor_id',
    as: 'agendamentos'
  });

  models.Usuario.belongsTo(Fornecedor, {
    foreignKey: 'fornecedor_id',
    as: 'fornecedorDoUsuario'
  });
};

module.exports = Fornecedor;

const { Sequelize, DataTypes } = require('sequelize'); 
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('FORNECEDOR', 'FUNCIONARIO'),
    allowNull: false
  },
  fornecedor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'fornecedores',
      key: 'id'
    }
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});


Usuario.associate = (models) => {
  Usuario.belongsTo(models.Fornecedor, {
    foreignKey: 'fornecedor_id',
    as: 'fornecedorUsuario' 
  });
};

module.exports = Usuario;

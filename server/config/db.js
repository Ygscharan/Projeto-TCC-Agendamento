const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do Sequelize usando as variáveis de ambiente
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false
  }
});

module.exports = sequelize;
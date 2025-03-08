// Configuração do banco de dados com Sequelize

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do Sequelize usando as variáveis de ambiente
const sequelize = new Sequelize({
    database: process.env.DB_NAME,   // Nome do banco de dados
    username: process.env.DB_USER,   // Usuário do banco
    password: process.env.DB_PASSWORD, // Senha do banco
    host: process.env.DB_HOST,        // Endereço do banco de dados
    dialect: 'mysql',                  // Tipo do banco de dados
    logging: false,                    // Desabilita o log do Sequelize
    define: {
        timestamps: false              // Desabilita as colunas 'createdAt' e 'updatedAt' por padrão
    }
});

// Teste de conexão com o banco de dados
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

testConnection();

module.exports = sequelize;

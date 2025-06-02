const express = require('express');
const cors = require('cors');
require('dotenv').config();

const fornecedorRoutes = require('./routes/fornecedores');
const notaFiscalRoutes = require('./routes/notasFiscais');
const agendamentoRoutes = require('./routes/agendamentos');
const authRoutes = require('./routes/authRoutes');
const lojaRoutes = require('./routes/lojas');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Para interpretar JSON
app.use(cors({ origin: '*' })); // Habilita CORS

// Rotas da API
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/notas-fiscais', notaFiscalRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/lojas', lojaRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.send(`
    <h1>API de Agendamento</h1>
    <p>Bem-vindo à API de Agendamento!</p>
    <ul>
      <li><a href="/api/fornecedores">Fornecedores</a></li>
      <li><a href="/api/notas-fiscais">Notas Fiscais</a></li>
      <li><a href="/api/agendamentos">Agendamentos</a></li>
      <li><a href="/api/auth">Autenticação</a></li>
      <li><a href="/api/lojas">Lojas</a></li>
    </ul>
  `);
});

// Middleware para rotas não definidas (404)
app.use((req, res) => {
  res.status(404).send('Página não encontrada!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

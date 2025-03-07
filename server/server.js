const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fornecedorRoutes = require('./routes/fornecedores');
const notaFiscalRoutes = require('./routes/notasFiscais');
const agendamentoRoutes = require('./routes/agendamentos');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Para interpretar JSON
app.use(cors()); // Habilita CORS

// Rotas
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/notas-fiscais', notaFiscalRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

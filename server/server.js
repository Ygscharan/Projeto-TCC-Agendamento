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



// Rotas
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/notas-fiscais', notaFiscalRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/auth', authRoutes); // Define as rotas de autenticação
app.use('/api/lojas', lojaRoutes);
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

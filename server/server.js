const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fornecedorRoutes = require('./routes/fornecedores');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Para interpretar JSON
app.use(cors()); // Habilita CORS

// Rotas
app.use('/api/fornecedores', fornecedorRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

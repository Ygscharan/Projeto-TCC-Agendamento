// Arquivo principal do backend

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Para interpretar JSON
app.use(cors()); // Habilita CORS

// Rotas (serão criadas depois)
app.get('/', (req, res) => {
    res.send('API do Projeto TCC funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

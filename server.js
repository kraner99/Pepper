const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Define a pasta atual para servir os arquivos estáticos (HTML e CSS)
app.use(express.static(path.join(__dirname)));

// Rota principal para carregar o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em JavaScript! Acesse: http://localhost:${PORT}`);
});
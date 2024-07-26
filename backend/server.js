const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Configurar middleware
app.use(cors());
app.use(express.json());

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

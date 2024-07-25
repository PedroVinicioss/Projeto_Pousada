const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configurar middleware
app.use(cors());
app.use(express.json());

// Configurar conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/chales', (req, res) => {
    db.query('SELECT * FROM Chales', (err, results) => {
      if (err) {
        console.error('Erro ao consultar chalés:', err);
        res.status(500).send('Erro ao consultar chalés');
        return;
      }
      res.json(results);
    });
  });

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

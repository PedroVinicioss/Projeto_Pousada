const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const chaleRoutes = require('./routes/chale.routes');
app.use('/chales', chaleRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
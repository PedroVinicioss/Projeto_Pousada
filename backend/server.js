const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const chaleRoutes = require('./routes/chale.routes');
app.use('/api/chales', chaleRoutes);

const hospedeRoutes = require('./routes/hospede.routes');
app.use('/api/hospedes', hospedeRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
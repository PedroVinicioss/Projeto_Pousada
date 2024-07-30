const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const acompanhanteRoutes = require('./routes/acompanhante.routes');
app.use('/acompanhante', acompanhanteRoutes);

const chaleRoutes = require('./routes/chale.routes');
app.use('/chales', chaleRoutes);

const consumoRoutes = require('./routes/consumo.routes');
app.use('/consumo', consumoRoutes);

const fechamentoCaixaRoutes = require('./routes/fechamentoCaixa.routes');
app.use('/fechamentoCaixa', fechamentoCaixaRoutes);

const hospedagemRoutes = require('./routes/hospedagem.routes');
app.use('/hospedagem', hospedagemRoutes);

const hospedeRoutes = require('./routes/hospede.routes');
app.use('/hospede', hospedeRoutes);

const produtoRoutes = require('./routes/produto.routes');
app.use('/produto', produtoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
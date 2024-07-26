const Chale = require('../models/chale.model');

exports.findAll = (req, res) => {
  Chale.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Ocorreu um erro ao buscar os chalés.'
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validar requisição
  if (!req.body.nome) {
    res.status(400).send({
      message: 'Conteúdo não pode ser vazio!'
    });
    return;
  }

  // Criar um Chalé
  const novoChale = {
    nome: req.body.nome,
  };

  // Salvar Chalé na base de dados
  Chale.create(novoChale, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Ocorreu um erro ao criar o Chalé.'
      });
    else res.send(data);
  });
};

// Outras funções de manipulação de Chales podem ser adicionadas aqui...

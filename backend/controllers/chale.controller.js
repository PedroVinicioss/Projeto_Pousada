const Chale = require('../models/chale.model');

// GET /api/chales
exports.findAll = (req, res) => {
  Chale.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Ocorreu um erro ao buscar os chalés.'
      });
    else res.send(data);
  });
};

// POST /api/chales
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

// PUT /api/chales/:id
exports.update = (req, res) => {
  // Validar requisição
  if (!req.body) {
    res.status(400).send({
      message: 'Conteúdo não pode ser vazio!'
    });
    return;
  }

  // Atualizar Chalé na base de dados
  Chale.updateById(req.params.id, new Chale(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'não encontrado') {
        res.status(404).send({
          message: `Chalé com id ${req.params.id} não encontrado.`
        });
      } else {
        res.status(500).send({
          message: `Erro ao atualizar o Chalé com id ${req.params.id}`
        });
      }
    } else res.send(data);
  });
};

// GET /api/chales/:id
exports.findOne = (req, res) => {
  Chale.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'não encontrado') {
        res.status(404).send({
          message: `Chalé com id ${req.params.id} não encontrado.`
        });
      } else {
        res.status(500).send({
          message: `Erro ao buscar o Chalé com id ${req.params.id}`
        });
      }
    } else res.send(data);
  });
};

// DELETE /api/chales/:id
exports.delete = (req, res) => {
  Chale.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'não encontrado') {
        res.status(404).send({
          message: `Chalé com id ${req.params.id} não encontrado.`
        });
      } else {
        res.status(500).send({
          message: `Erro ao deletar o Chalé com id ${req.params.id}`
        });
      }
    } else res.send({ message: 'Chalé deletado com sucesso!' });
  });
};
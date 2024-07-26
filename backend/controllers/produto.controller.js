const Produto = require('../models/produto.model');

// GET /api/produtos
exports.findAll = (req, res) => {
    Produto.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao buscar os produtos.'
        });
        else res.send(data);
    });
};

// POST /api/produtos
exports.create = (req, res) => {
    // Validar requisição
    if (!req.body.nome || !req.body.valor) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Criar um Produto
    const novoProduto = {
        nome: req.body.nome,
        preco: req.body.valor,   
    };

    // Salvar Produto na base de dados
    Produto.create(novoProduto, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao criar o Produto.'
        });
        else res.send(data);
    });
};

// PUT /api/produtos/:id
exports.update = (req, res) => {
    // Validar requisição
    if (!req.body) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Atualizar Produto na base de dados
    Produto.updateById(req.params.id, new Produto(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Produto com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao atualizar o Produto com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// GET /api/produtos/:id
exports.findOne = (req, res) => {
    Produto.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado')
            res.status(404).send({
                message: `Produto com id ${req.params.id} não encontrado.`
            });
            else
            res.status(500).send({
                message: `Erro ao buscar Produto com id ${req.params.id}`
            });
        } else res.send(data);
    });
};

// DELETE /api/produtos/:id
exports.delete = (req, res) => {
    Produto.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Produto com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao deletar o Produto com id ${req.params.id}`
                });
            }
        } else res.send({ message: 'Produto deletado com sucesso!' });
    });
};
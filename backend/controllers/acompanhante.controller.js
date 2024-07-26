const Acompanhante = require('../models/acompanhante.model');

// GET /api/acompanhantes
exports.findAll = (req, res) => {
    Acompanhante.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao buscar os acompanhantes.'
        });
        else res.send(data);
    });
};

// POST /api/acompanhantes
exports.create = (req, res) => {
    // Validar requisição
    if (!req.body.nome || !req.body.cpf) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    if (!req.body.hospedagem_id) {
        res.status(400).send({
            message: 'Acompanhante deve estar associado a uma hospedagem!'
        });
        return;
    }

    // Criar um Acompanhante
    const novoAcompanhante = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        hospedagem_id: req.body.hospedagem_id
    };

    // Salvar Acompanhante na base de dados
    Acompanhante.create(novoAcompanhante, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao criar o Acompanhante.'
        });
        else res.send(data);
    });
}

// PUT /api/acompanhantes/:id
exports.update = (req, res) => {
    // Validar requisição
    if (!req.body) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Atualizar Acompanhante na base de dados
    Acompanhante.updateById(req.params.id, new Acompanhante(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
            res.status(404).send({
                message: `Acompanhante com id ${req.params.id} não encontrado.`
            });
            else
            res.status(500).send({
                message: `Erro ao atualizar Acompanhante com id ${req.params.id}`
            });
        } else res.send(data);
    });
};

// GET /api/acompanhantes/:id
exports.findOne = (req, res) => {
    Acompanhante.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
            res.status(404).send({
                message: `Acompanhante com id ${req.params.id} não encontrado.`
            });
            else
            res.status(500).send({
                message: `Erro ao buscar Acompanhante com id ${req.params.id}`
            });
        } else res.send(data);
    });
};

// DELETE /api/acompanhantes/:id
exports.delete = (req, res) => {
    Acompanhante.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found')
            res.status(404).send({
                message: `Acompanhante com id ${req.params.id} não encontrado.`
            });
            else
            res.status(500).send({
                message: `Erro ao remover Acompanhante com id ${req.params.id}`
            });
        } else res.send({ message: 'Acompanhante removido com sucesso!' });
    });
};
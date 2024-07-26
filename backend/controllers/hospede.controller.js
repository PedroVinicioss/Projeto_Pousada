const Hospede = require('../models/hospede.model');

// GET /api/hospedes
exports.findAll = (req, res) => {
    Hospede.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao buscar os hospedes.'
        });
        else res.send(data);
    });
};

// POST /api/hospedes
exports.create = (req, res) => {
    // Validar requisição
    if (!req.body.nome || !req.body.cpf || !req.body.telefone || !req.body.email) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Criar um Hospede
    const novoHospede = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        email: req.body.email,
    };

    // Salvar Hospede na base de dados
    Hospede.create(novoHospede, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao criar o Hospede.'
        });
        else res.send(data);
    });
};

// PUT /api/hospedes/:id
exports.update = (req, res) => {
    // Validar requisição
    if (!req.body) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Atualizar Hospede na base de dados
    Hospede.updateById(req.params.id, new Hospede(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Hospede com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao atualizar o Hospede com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// GET /api/hospedes/:id
exports.findOne = (req, res) => {
    Hospede.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Hospede com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao buscar o Hospede com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// DELETE /api/hospedes/:id
exports.delete = (req, res) => {
    Hospede.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Hospede com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao deletar o Hospede com id ${req.params.id}`
                });
            }
        } else res.send({ message: 'Hospede deletado com sucesso!' });
    });
};
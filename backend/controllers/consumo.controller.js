const Consumo = require('../models/consumo.model');

// GET /api/consumos
exports.findAll = (req, res) => {
    Consumo.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao buscar os consumos.'
        });
        else res.send(data);
    });
};

// POST /api/consumos
exports.create = (req, res) => {
    // Validar requisição
    if (!req.body.hospedagem_id || !req.body.produto_id || !req.body.quantidade) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    let data = new Date();

    // Criar um Consumo
    const novoConsumo = {
        hospedagem_id: req.body.hospedagem_id,
        produto_id: req.body.produto_id,
        quantidade: req.body.quantidade,
        data_consumo: data,
    };

    // Salvar Consumo na base de dados
    Consumo.create(novoConsumo, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao criar o Consumo.'
        });
        else res.send(data);
    });
};

// PUT /api/consumos/:id
exports.update = (req, res) => {
    // Validar requisição
    if (!req.body) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Atualizar Consumo na base de dados
    Consumo.updateById(req.params.id, new Consumo(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Consumo com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao atualizar o Consumo com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// GET /api/consumos/:id
exports.findOne = (req, res) => {
    Consumo.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Consumo com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao buscar o Consumo com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// DELETE /api/consumos/:id
exports.delete = (req, res) => {
    Consumo.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Consumo com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao deletar o Consumo com id ${req.params.id}`
                });
            }
        } else res.send({ message: 'Consumo deletado com sucesso!' });
    });
};
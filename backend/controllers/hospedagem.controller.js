const Hospedagem = require('../models/hospedagem.model');

// GET /api/hospedagens
exports.findAll = (req, res) => {
    Hospedagem.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao buscar as hospedagens.'
        });
        else res.send(data);
    });
};

// POST /api/hospedagens
exports.create = (req, res) => {
    // Validar requisição
    if (!req.body.hospede_id || !req.body.chale_id || !req.body.data_entrada || !req.body.data_saida) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Criar uma Hospedagem
    const novaHospedagem = {
        chale_id: req.body.chale_id,
        hospede_principal_id: req.body.hospede_id,
        data_checkin: req.body.data_entrada,
        data_checkout: req.body.data_saida,
        valor_reserva: req.body.valor_reserva,
        status: req.body.status
    };

    // Salvar Hospedagem na base de dados
    Hospedagem.create(novaHospedagem, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao criar a Hospedagem.'
        });
        else res.send(data);
    });
};

// PUT /api/hospedagens/:id
exports.update = (req, res) => {
    // Validar requisição
    if (!req.body) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Atualizar Hospedagem na base de dados
    Hospedagem.updateById(req.params.id, new Hospedagem(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Hospedagem com id ${req.params.id} não encontrada.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao atualizar a Hospedagem com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// GET /api/hospedagens/:id
exports.findOne = (req, res) => {
    Hospedagem.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Hospedagem com id ${req.params.id} não encontrada.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao buscar a Hospedagem com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// DELETE /api/hospedagens/:id
exports.delete = (req, res) => {
    Hospedagem.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Hospedagem com id ${req.params.id} não encontrada.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao deletar a Hospedagem com id ${req.params.id}`
                });
            }
        } else res.send({ message: 'Hospedagem deletada com sucesso!' });
    });
};
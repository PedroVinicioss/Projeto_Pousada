const FechamentoCaixa = require('../models/fechamentoCaixa.model');

// GET /api/fechamentoCaixas
exports.findAll = (req, res) => {
    FechamentoCaixa.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao buscar os fechamentos de caixa.'
        });
        else res.send(data);
    });
};

// POST /api/fechamentoCaixas
exports.create = (req, res) => {
    // Validar requisição
    if (!req.body.hospedagem_id || !req.body.valor) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    let data = new Date();

    // Criar um Fechamento de Caixa
    const novoFechamentoCaixa = {
        hospedagem_id: req.body.hospedagem_id,
        valor_total: req.body.valor,
        data_fechamento: data
    };

    // Salvar Fechamento de Caixa na base de dados
    FechamentoCaixa.create(novoFechamentoCaixa, (err, data) => {
        if (err)
        res.status(500).send({
            message: err.message || 'Ocorreu um erro ao criar o Fechamento de Caixa.'
        });
        else res.send(data);
    });
};

// PUT /api/fechamentoCaixas/:id
exports.update = (req, res) => {
    // Validar requisição
    if (!req.body) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio!'
        });
        return;
    }

    // Atualizar Fechamento de Caixa na base de dados
    FechamentoCaixa.updateById(req.params.id, new FechamentoCaixa(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Fechamento de Caixa com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao atualizar o Fechamento de Caixa com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// GET /api/fechamentoCaixas/:id
exports.findOne = (req, res) => {
    FechamentoCaixa.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado') {
                res.status(404).send({
                    message: `Fechamento de Caixa com id ${req.params.id} não encontrado.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao buscar o Fechamento de Caixa com id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
};

// DELETE /api/fechamentoCaixas/:id
exports.delete = (req, res) => {
    FechamentoCaixa.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'não encontrado')
            res.status(404).send({
                message: `Fechamento de Caixa com id ${req.params.id} não encontrado.`
            });
            else
            res.status(500).send({
                message: `Não foi possível deletar o Fechamento de Caixa com id ${req.params.id}`
            });
        } else res.send({ message: 'Fechamento de Caixa deletado com sucesso!' });
    });
};
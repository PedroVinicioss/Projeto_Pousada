const db = require('../config/db.config');

const FechamentoCaixa = {};

FechamentoCaixa.getAll = (result) => {
    db.query('SELECT * FROM fechamento_caixa', (err, res) => {
        if (err) {
            console.log('Erro ao buscar fechamentos de caixa:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
const db = require('../config/db.config');

const Consumo = {};

Consumo.getAll = (result) => {
    db.query('SELECT * FROM Consumos', (err, res) => {
        if (err) {
            console.log('Erro ao buscar consumos:', err);
            result(err, null);
            return;
        }
        result(null, res);
    })
};
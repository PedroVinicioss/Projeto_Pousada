const db = require('../config/db.config');

const Consumo = {};

Consumo.getAll = (result) => {
    db.query('SELECT * FROM consumos', (err, res) => {
        if (err) {
            console.log('Erro ao buscar consumos:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Consumo.create = (novoConsumo, result) => {
    db.query('INSERT INTO consumos SET ?', novoConsumo, (err, res) => {
        if (err) {
            console.log('Erro ao criar consumo:', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...novoConsumo });
    });
};

Consumo.delete = (id, result) => {
    db.query('DELETE FROM consumos WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erro ao deletar consumo:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, res);
    });
};

Consumo.update = (id, consumo, result) => {
    db.query('UPDATE consumos SET ? WHERE id = ?', [consumo, id], (err, res) => {
        if (err) {
            console.log('Erro ao atualizar consumo:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, { id: id, ...consumo });
    });
};

Consumo.findById = (id, result) => {
    db.query(`SELECT * FROM consumos WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro ao buscar consumo:', err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Consumo;
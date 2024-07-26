const db = require('../config/db.config');

const Hospede = {};

Hospede.getAll = (result) => {
    db.query('SELECT * FROM hospedes', (err, res) => {
        if (err) {
            console.log('Erro ao buscar hospedes:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Hospede.create = (novoHospede, result) => {
    db.query('INSERT INTO hospedes SET ?', novoHospede, (err, res) => {
        if (err) {
            console.log('Erro ao criar hospede:', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...novoHospede });
    });
};

Hospede.delete = (id, result) => {
    db.query('DELETE FROM hospedes WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erro ao deletar hospede:', err);
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

Hospede.update = (id, hospede, result) => {
    db.query('UPDATE hospedes SET ? WHERE id = ?', [hospede, id], (err, res) => {
        if (err) {
            console.log('Erro ao atualizar hospede:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, { id: id, ...hospede });
    });
};

Hospede.findById = (id, result) => {
    db.query(`SELECT * FROM hospedes WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro ao buscar hospede:', err);
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

module.exports = Hospede;
const db = require('../config/db.config');

const Hospedagem = {};

Hospedagem.getAll = (result) => {
    db.query('SELECT * FROM hospedagens', (err, res) => {
        if (err) {
            console.log('Erro ao buscar hospedagens:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Hospedagem.create = (novaHospedagem, result) => {
    db.query('INSERT INTO hospedagens SET ?', novaHospedagem, (err, res) => {
        if (err) {
            console.log('Erro ao criar hospedagem:', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...novaHospedagem });
    });
};

Hospedagem.delete = (id, result) => {
    db.query('DELETE FROM hospedagens WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erro ao deletar hospedagem:', err);
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

Hospedagem.update = (id, hospedagem, result) => {
    db.query('UPDATE hospedagens SET ? WHERE id = ?', [hospedagem, id], (err, res) => {
        if (err) {
            console.log('Erro ao atualizar hospedagem:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, { id: id, ...hospedagem });
    });
};

Hospedagem.findById = (id, result) => {
    db.query(`SELECT * FROM hospedagens WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro ao buscar hospedagem:', err);
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

module.exports = Hospedagem;
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

FechamentoCaixa.create = (novoFechamentoCaixa, result) => {
    db.query('INSERT INTO fechamento_caixa SET ?', novoFechamentoCaixa, (err, res) => {
        if (err) {
            console.log('Erro ao criar fechamento de caixa:', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...novoFechamentoCaixa });
    });
};

FechamentoCaixa.delete = (id, result) => {
    db.query('DELETE FROM fechamento_caixa WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erro ao deletar fechamento de caixa:', err);
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

FechamentoCaixa.update = (id, fechamentoCaixa, result) => {
    db.query('UPDATE fechamento_caixa SET ? WHERE id = ?', [fechamentoCaixa, id], (err, res) => {
        if (err) {
            console.log('Erro ao atualizar fechamento de caixa:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, { id: id, ...fechamentoCaixa });
    });
};

FechamentoCaixa.findById = (id, result) => {
    db.query(`SELECT * FROM fechamento_caixa WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro ao buscar fechamento de caixa:', err);
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

module.exports = FechamentoCaixa;
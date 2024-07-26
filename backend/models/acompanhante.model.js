const db = require('../config/db.config');

const Acompanhante = {};

Acompanhante.getAll = (result) => {
    db.query('SELECT * FROM acompanhantes', (err, res) => {
        if (err) {
            console.log('Erro ao buscar acompanhantes:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Acompanhante.create = (novoAcompanhante, result) => {
    db.query('INSERT INTO acompanhantes SET ?', novoAcompanhante, (err, res) => {
        if (err) {
            console.log('Erro ao criar acompanhante:', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...novoAcompanhante });
    });
};

Acompanhante.delete = (id, result) => {
    db.query('DELETE FROM acompanhantes WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erro ao deletar acompanhante:', err);
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

Acompanhante.update = (id, acompanhante, result) => {
    db.query('UPDATE acompanhantes SET ? WHERE id = ?', [acompanhante, id], (err, res) => {
        if (err) {
            console.log('Erro ao atualizar acompanhante:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, { id: id, ...acompanhante });
    });
};

Acompanhante.findById = (id, result) => {
    db.query(`SELECT * FROM acompanhantes WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro ao buscar acompanhante:', err);
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

module.exports = Acompanhante;
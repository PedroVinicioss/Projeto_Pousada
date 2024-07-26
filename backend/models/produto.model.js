const db = require('../config/db.config');

const Produto = {};

Produto.getAll = (result) => {
    db.query('SELECT * FROM produtos', (err, res) => {
        if (err) {
            console.log('Erro ao buscar produtos:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Produto.create = (novoProduto, result) => {
    db.query('INSERT INTO produtos SET ?', novoProduto, (err, res) => {
        if (err) {
            console.log('Erro ao criar produto:', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...novoProduto });
    });
};

Produto.delete = (id, result) => {
    db.query('DELETE FROM produtos WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Erro ao deletar produto:', err);
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

Produto.update = (id, produto, result) => {
    db.query('UPDATE produtos SET ? WHERE id = ?', [produto, id], (err, res) => {
        if (err) {
            console.log('Erro ao atualizar produto:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, { id: id, ...produto });
    });
};

Produto.findById = (id, result) => {
    db.query(`SELECT * FROM produtos WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Erro ao buscar produto:', err);
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

module.exports = Produto;
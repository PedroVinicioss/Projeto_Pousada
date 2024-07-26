const db = require('../config/db.config');

const Chale = {};

Chale.getAll = (result) => {
  db.query('SELECT * FROM chales', (err, res) => {
    if (err) {
      console.log('Erro ao buscar chalés:', err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Chale.create = (novoChale, result) => {
  db.query('INSERT INTO chales SET ?', novoChale, (err, res) => {
    if (err) {
      console.log('Erro ao criar chalé:', err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...novoChale });
  });
};

Chale.delete = (id, result) => {
  db.query('DELETE FROM chales WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('Erro ao deletar chalé:', err);
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

Chale.update = (id, chale, result) => {
  db.query('UPDATE chales SET ? WHERE id = ?', [chale, id], (err, res) => {
    if (err) {
      console.log('Erro ao atualizar chalé:', err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }
    result(null, { id: id, ...chale });
  });
};

Chale.findById = (id, result) => {
  db.query(`SELECT * FROM chales WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('Erro ao buscar chalé:', err);
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


module.exports = Chale;

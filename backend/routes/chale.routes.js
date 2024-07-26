const express = require('express');
const router = express.Router();
const chales = require('../controllers/chale.controller');

// Rota para buscar todos os chalés
router.get('/', chales.findAll);

// Rota para criar um novo chalé
router.post('/', chales.create);

// Outras rotas de Chalés podem ser adicionadas aqui...

module.exports = router;

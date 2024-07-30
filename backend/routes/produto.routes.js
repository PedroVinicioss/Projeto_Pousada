const express = require('express');
const router = express.Router();
const produto = require('../controllers/produto.controller');

router.get('/', produto.findAll);

router.post('/', produto.create);

router.put('/:id', produto.update);

router.delete('/:id', produto.delete);

router.get('/:id', produto.findOne);

module.exports = router;
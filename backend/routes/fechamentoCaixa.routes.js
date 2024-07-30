const express = require('express');
const router = express.Router();
const fechamentoCaixa = require('../controllers/fechamentoCaixa.controller');

router.get('/', fechamentoCaixa.findAll);

router.post('/', fechamentoCaixa.create);

router.put('/:id', fechamentoCaixa.update);

router.delete('/:id', fechamentoCaixa.delete);

router.get('/:id', fechamentoCaixa.findOne);

module.exports = router;
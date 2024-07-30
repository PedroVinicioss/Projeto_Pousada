const express = require('express');
const router = express.Router();
const consumo = require('../controllers/consumo.controller');

router.get('/', consumo.findAll);

router.post('/', consumo.create);

router.put('/:id', consumo.update);

router.delete('/:id', consumo.delete);

router.get('/:id', consumo.findOne);

module.exports = router;
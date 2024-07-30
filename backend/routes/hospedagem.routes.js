const express = require('express');
const router = express.Router();
const hospedagem = require('../controllers/hospedagem.controller');

router.get('/', hospedagem.findAll);

router.post('/', hospedagem.create);

router.put('/:id', hospedagem.update);

router.delete('/:id', hospedagem.delete);

router.get('/:id', hospedagem.findOne);

module.exports = router;
const express = require('express');
const router = express.Router();
const hospede = require('../controllers/hospede.controller');

router.get('/', hospede.findAll);

router.post('/', hospede.create);

router.put('/:id', hospede.update);

router.delete('/:id', hospede.delete);

router.get('/:id', hospede.findOne);

module.exports = router;
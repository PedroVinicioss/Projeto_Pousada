const express = require('express');
const router = express.Router();
const acompanhante = require('../controllers/acompanhante.controller');

router.get('/', acompanhante.findAll);

router.post('/', acompanhante.create);

router.put('/:id', acompanhante.update);

router.delete('/:id', acompanhante.delete);

router.get('/:id', acompanhante.findOne);

module.exports = router;
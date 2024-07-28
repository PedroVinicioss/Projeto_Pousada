const express = require('express');
const router = express.Router();
const chales = require('../controllers/chale.controller');

router.get('/', chales.findAll);

router.post('/', chales.create);

router.put('/:id', chales.update);

router.delete('/:id', chales.delete);

router.get('/:id', chales.findOne);

module.exports = router;

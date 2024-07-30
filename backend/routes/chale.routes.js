const express = require('express');
const router = express.Router();
const chale = require('../controllers/chale.controller');

router.get('/', chale.findAll);

router.post('/', chale.create);

router.put('/:id', chale.update);

router.delete('/:id', chale.delete);

router.get('/:id', chale.findOne);

module.exports = router;
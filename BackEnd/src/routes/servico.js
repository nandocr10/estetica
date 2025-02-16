const express = require('express');
const router = express.Router();
const servicoController = require('./../controller/servico');

// Rotas para serviços
router.get('/', servicoController.getAll);
router.get('/:id', servicoController.getById);
router.post('/', servicoController.create);
router.put('/:id', servicoController.update);
router.delete('/:id', servicoController.deleteEntity);

module.exports = router;

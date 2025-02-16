const express = require('express');
const router = express.Router();
const clienteController = require('./../controller/cliente');

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getById);
router.post('/', clienteController.create);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.deleteEntity);

module.exports = router;

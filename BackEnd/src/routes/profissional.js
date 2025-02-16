const express = require('express');
const router = express.Router();
const profissionalController = require('../controller/profissional');

// Rotas para profissionais
router.get('/', profissionalController.getAll);
router.get('/:id', profissionalController.getById);
router.post('/', profissionalController.create);
router.put('/:id', profissionalController.update);
router.delete('/:id', profissionalController.deleteEntity);

module.exports = router;

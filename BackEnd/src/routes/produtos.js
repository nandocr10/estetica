const express = require('express');
const router = express.Router();
const produtoController = require('../controller/produtos');

router.get('/', produtoController.getAll);
router.get('/:id', produtoController.getById);
router.post('/', produtoController.create);
router.put('/:id', produtoController.update);
router.delete('/:id', produtoController.deleteEntity);

module.exports = router;

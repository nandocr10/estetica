const express = require('express');
const router = express.Router();
//const fornecedorController = require('../controllers/fornecedor');
const fornecedorController = require("./../controller/fornecedor")
//const authenticateToken = require('../middlewares/authenticateToken'); // Middleware para autenticação

router.get('/',  fornecedorController.getAll);
router.get('/:id',  fornecedorController.getById);
router.post('/',  fornecedorController.create);
router.put('/:id',  fornecedorController.update);
router.delete('/:id',  fornecedorController.deleteEntity);

module.exports = router;

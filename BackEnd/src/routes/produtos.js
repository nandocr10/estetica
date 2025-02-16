const express = require('express');
const router = express.Router();
const {
  createProduto,
  getProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto
} = require('./produtoController');

router.post('/produtos', createProduto);
router.get('/produtos', getProdutos);
router.get('/produtos/:id', getProdutoById);
router.put('/produtos/:id', updateProduto);
router.delete('/produtos/:id', deleteProduto);

module.exports = router;

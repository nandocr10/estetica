const express = require('express');
const router = express.Router();
const atendimentoController = require('./../controller/atendimento');
const { createFullAtendimento, getAtendimentoData } = require('./../controller/atendimento');

// Endpoint para criar atendimento (salvar nas tabelas Atendimento e AtendServ)
router.post('/full', atendimentoController.createFullAtendimento);

// Endpoint para obter os dados necessários para a tela de atendimento
router.get('/data', atendimentoController.getAtendimentoData);

// Rotas para atendimentos
router.get('/', atendimentoController.getAll);
router.get('/:id', atendimentoController.getById);
router.post('/', atendimentoController.create);
router.put('/:id', atendimentoController.update);
router.delete('/:id', atendimentoController.deleteEntity);

module.exports = router;

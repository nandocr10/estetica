const express = require('express');
const router = express.Router();
const atendServController = require('../controller/atendserv')

// Rotas para atendimentos de serviço
router.get('/', atendServController.getAll); // Obter todos os atendimentos
router.get('/:codAtend/:codServ', atendServController.getById); // Obter atendimento por CodAtend e CodServ
router.post('/', atendServController.create); // Criar novo atendimento
router.put('/:codAtend/:codServ', atendServController.update); // Atualizar atendimento existente
router.delete('/:codAtend/:codServ', atendServController.deleteEntity); // Deletar atendimento

module.exports = router;

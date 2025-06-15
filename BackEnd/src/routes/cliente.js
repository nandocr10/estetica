const express = require('express');
const router = express.Router();
const clienteController = require('./../controller/cliente');

// Middleware para validação
router.post('/create', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
    }

    // Lógica para criar cliente
    const novoCliente = {
        nome,
        email: req.body.email || null,
        telefone: req.body.telefone || null,
    };

    // Simulação de resposta (substitua pela lógica real de banco de dados)
    res.status(201).json({ message: 'Cliente criado com sucesso!', cliente: novoCliente });
});

// Rota para pesquisar clientes pelo nome
router.get('/search', async (req, res) => {
    const { nome } = req.query;

    if (!nome) {
        return res.status(400).json({ error: 'O parâmetro "nome" é obrigatório para a pesquisa.' });
    }

    try {
        // Substitua pela lógica real de busca no banco de dados
        const clientesEncontrados = await clienteController.searchByName(nome);
        res.status(200).json(clientesEncontrados);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes.' });
    }
});

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getById);
router.post('/', clienteController.create);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.deleteEntity);

module.exports = router;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');

async function getAll(req, res) {
    try {
        const clientes = await prisma.cliente.findMany({
            orderBy: {
                NmCli: 'asc', // Ordena por nome em ordem crescente (asc). Para decrescente, use 'desc'.
            },
        });
        res.status(httpStatus.OK).json(clientes);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function getById(req, res) {
    try {
        const cliente = await prisma.cliente.findUnique({
            where: { Codcli: parseInt(req.params.id) }
        });
        if (!cliente) {
            return res.status(httpStatus.NOT_FOUND).send('Cliente não encontrado');
        }
        res.status(httpStatus.OK).json(cliente);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function create(req, res) {
    try {
        const cliente = await prisma.cliente.create({
            data: {
                NmCli: req.body.NmCli,
                CpfCli: req.body.CpfCli,
                FoneCli: req.body.FoneCli,
                EmailCli: req.body.EmailCli,
                EndCli: req.body.EndCli,
                CepCli: req.body.CepCli,
                ComplCli: req.body.ComplCli,
                redesocial: req.body.redesocial,
                DtUltCompra: req.body.DtUltCompra ? new Date(req.body.DtUltCompra) : null,
            }
        });
        res.status(httpStatus.CREATED).json(cliente);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function update(req, res) {
    try {
        const cliente = await prisma.cliente.update({
            where: { Codcli: parseInt(req.params.id) },
            data: {
                NmCli: req.body.NmCli,
                CpfCli: req.body.CpfCli,
                FoneCli: req.body.FoneCli,
                EmailCli: req.body.EmailCli,
                EndCli: req.body.EndCli,
                CepCli: req.body.CepCli,
                ComplCli: req.body.ComplCli,
                redesocial: req.body.redesocial,
                DtUltCompra: req.body.DtUltCompra ? new Date(req.body.DtUltCompra) : null,
            }
        });
        res.status(httpStatus.OK).json(cliente);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function deleteEntity(req, res) {
    try {
        const cliente = await prisma.cliente.delete({
            where: { Codcli: parseInt(req.params.id) }
        });
        res.status(httpStatus.OK).json(cliente);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na remoção');
    }
}

async function searchByName(req, res) {
    const { nome } = req.query; // Supondo que o nome venha como um parâmetro de consulta
    try {
        const clientes = await prisma.cliente.findMany({
            where: {
                NmCli: {
                    contains: nome, // Busca parcial pelo nome
                    mode: 'insensitive', // Ignorar maiúsculas/minúsculas
                },
            },
        });
        res.status(httpStatus.OK).json(clientes);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na busca por nome');
    }
}

module.exports = { getAll, getById, create, update, deleteEntity, searchByName };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');

async function getAll(req, res) {
    try {
        const servicos = await prisma.servico.findMany();
        res.status(httpStatus.OK).json(servicos);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function getById(req, res) {
    try {
        const servico = await prisma.servico.findUnique({
            where: { CodServ: parseInt(req.params.id) }
        });
        if (!servico) {
            return res.status(httpStatus.NOT_FOUND).send('Serviço não encontrado');
        }
        res.status(httpStatus.OK).json(servico);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function create(req, res) {
    try {
        const servico = await prisma.servico.create({
            data: {
                DsServ: req.body.DsServ,
                DtCad: new Date(),
            }
        });
        res.status(httpStatus.CREATED).json(servico);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function update(req, res) {
    try {
        const servico = await prisma.servico.update({
            where: { CodServ: parseInt(req.params.id) },
            data: {
                DsServ: req.body.DsServ,
                DtCad: req.body.DtCad ? new Date(req.body.DtCad) : null,
            }
        });
        res.status(httpStatus.OK).json(servico);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function deleteEntity(req, res) {
    try {
        const servico = await prisma.servico.delete({
            where: { CodServ: parseInt(req.params.id) }
        });
        res.status(httpStatus.OK).json(servico);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na remoção');
    }
}

module.exports = { getAll, getById, create, update, deleteEntity };

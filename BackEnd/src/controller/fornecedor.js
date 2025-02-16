const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');

async function getAll(req, res) {
    try {
        const fornecedores = await prisma.fornecedor.findMany();
        res.status(httpStatus.OK).json(fornecedores);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function getById(req, res) {
    try {
        const fornecedor = await prisma.fornecedor.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!fornecedor) {
            return res.status(httpStatus.NOT_FOUND).send('Fornecedor não encontrado');
        }
        res.status(httpStatus.OK).json(fornecedor);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function create(req, res) {
    try {
        const fornecedor = await prisma.fornecedor.create({
            data: {
                CnpjFor: req.body.CnpjFor,
                NmFor: req.body.NmFor,
                FoneFor: req.body.FoneFor,
                EmailFor: req.body.EmailFor,
                DtCad:  new Date(),
            }
        });
        res.status(httpStatus.CREATED).json(fornecedor);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function update(req, res) {
    try {
        const fornecedor = await prisma.fornecedor.update({
            where: { id: parseInt(req.params.id) },
            data: {
                CnpjFor: req.body.CnpjFor,
                NmFor: req.body.NmFor,
                FoneFor: req.body.FoneFor,
                EmailFor: req.body.EmailFor,
                DtCad: req.body.DtCad,
            }
        });
        res.status(httpStatus.OK).json(fornecedor);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

async function deleteEntity(req, res) {
    try {
        const fornecedor = await prisma.fornecedor.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(httpStatus.OK).json(fornecedor);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na remoção');
    }
}

module.exports = { getAll, getById, create, update, deleteEntity };

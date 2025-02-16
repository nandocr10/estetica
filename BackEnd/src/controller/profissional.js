const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');

// Função para obter todos os profissionais
async function getAll(req, res) {
    try {
        const profissionais = await prisma.profissional.findMany();
        res.status(httpStatus.OK).json(profissionais);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Função para obter um profissional pelo ID
async function getById(req, res) {
    try {
        const profissional = await prisma.profissional.findUnique({
            where: { CodProf: parseInt(req.params.id) },
        });
        if (!profissional) {
            return res.status(httpStatus.NOT_FOUND).send('Profissional não encontrado');
        }
        res.status(httpStatus.OK).json(profissional);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Função para criar um novo profissional
async function create(req, res) {
    try {
        const profissional = await prisma.profissional.create({
            data: {
                NmProf: req.body.NmProf,
                CpfProf: req.body.CpfProf,
                DtCad: req.body.DtCad ? new Date(req.body.DtCad) : null,
                DocReg: req.body.DocReg,
                FoneProf: req.body.FoneProf,
                EmailProf: req.body.EmailProf,
                AtivProfi: req.body.AtivProfi,
            }
        });
        res.status(httpStatus.CREATED).json(profissional);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Função para atualizar um profissional existente
async function update(req, res) {
    try {
        const profissional = await prisma.profissional.update({
            where: { CodProf: parseInt(req.params.id) },
            data: {
                NmProf: req.body.NmProf,
                CpfProf: req.body.CpfProf,
                DtCad: req.body.DtCad ? new Date(req.body.DtCad) : null,
                DocReg: req.body.DocReg,
                FoneProf: req.body.FoneProf,
                EmailProf: req.body.EmailProf,
                AtivProfi: req.body.AtivProfi,
            }
        });
        res.status(httpStatus.OK).json(profissional);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Função para deletar um profissional
async function deleteEntity(req, res) {
    try {
        const profissional = await prisma.profissional.delete({
            where: { CodProf: parseInt(req.params.id) }
        });
        res.status(httpStatus.OK).json(profissional);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na remoção');
    }
}

module.exports = { getAll, getById, create, update, deleteEntity };

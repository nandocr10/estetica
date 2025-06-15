const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');

// Obter todos os produtos
async function getAll(req, res) {
    try {
        const produtos = await prisma.produto.findMany();
        res.status(httpStatus.OK).json(produtos);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Obter um produto pelo ID
async function getById(req, res) {
    try {
        const produto = await prisma.produto.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!produto) {
            return res.status(httpStatus.NOT_FOUND).send('Produto não encontrado');
        }
        res.status(httpStatus.OK).json(produto);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Criar um novo produto
async function create(req, res) {
    try {
        const produto = await prisma.produto.create({
            data: {
                Fornecedor_id: parseInt(req.body.Fornecedor_id),
                DsProdt: req.body.DsProdt,
                NmAbr: req.body.NmAbr,
                DtCad: req.body.DtCad ? new Date(req.body.DtCad) : null,
                UnMedida: req.body.UnMedida,
                TpCateg: req.body.TpCateg,
                QtdEstoq: req.body.QtdEstoq,
                DtUltComp: req.body.DtUltComp ? new Date(req.body.DtUltComp) : null,
                VrUltComp: req.body.VrUltComp,
                DtPenultComp: req.body.DtPenultComp ? new Date(req.body.DtPenultComp) : null,
                VrPenultComp: req.body.VrPenultComp,
                DtVenc: req.body.DtVenc ? new Date(req.body.DtVenc) : null,
                DtVenc: req.body.DtVenc,
            }
        });
        res.status(httpStatus.CREATED).json(produto);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Atualizar um produto existente
async function update(req, res) {
    try {
        const produto = await prisma.produto.update({
            where: { id: parseInt(req.params.id) },
            data: {
                Fornecedor_id: parseInt(req.body.Fornecedor_id),
                DsProdt: req.body.DsProdt,
                NmAbr: req.body.NmAbr,
                DtCad: req.body.DtCad ? new Date(req.body.DtCad) : null,
                UnMedida: req.body.UnMedida,
                TpCateg: req.body.TpCateg,
                QtdEstoq: req.body.QtdEstoq,
                DtUltComp: req.body.DtUltComp ? new Date(req.body.DtUltComp) : null,
                VrUltComp: req.body.VrUltComp,
                DtPenultComp: req.body.DtPenultComp ? new Date(req.body.DtPenultComp) : null,
                VrPenultComp: req.body.VrPenultComp,
                DtVenc: req.body.DtVenc ? new Date(req.body.DtVenc) : null,
                DtVenc: req.body.DtVenc ,
            }
        });
        res.status(httpStatus.OK).json(produto);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Deletar um produto
async function deleteEntity(req, res) {
    try {
        const produto = await prisma.produto.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(httpStatus.OK).json(produto);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na remoção');
    }
}

module.exports = { getAll, getById, create, update, deleteEntity };

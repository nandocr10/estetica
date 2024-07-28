const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status");

const prisma = new PrismaClient()

async function getAll(req, res) {
    try {

        const grpacess = await prisma.grpacess.findMany()

        return res.status(httpStatus.OK).json(grpacess);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

async function getById(req, res) {
    try {
        const grpacess = await prisma.grpacess.findUnique({
            where: {
                CodGrp: parseInt(req.params.id)
            }
        });
        
        if (!grpacess) {
            return res.status(httpStatus.NOT_FOUND).send("Usuário não encontrado");
        }

        return res.status(httpStatus.OK).json(grpacess);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição");
    }
}

async function create(req, res) {
    try {
        const grpacess = await prisma.grpacess.create({
           
            data: {
                NomeGrp : req.body.nomegrp
            }
        });
        console.log(req.body);
        //console.log(NomeGrp);
        res.status(httpStatus.OK).json(grpacess);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }

    console.log(req.params.description);

}

async function update(req, res) {

    try {

        const grpacess = await prisma.grpacess.update({
            data: req.body,
            where: {
                codgrp: parseInt(req.params.codgrp)
            }
        })

        res.status(httpStatus.OK).json(grpacess);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {
        const grpacess = await prisma.grpacess.delete({
            where: {
                codgrp: parseInt(req.params.codgrp)
            }
        })

        res.status(httpStatus.OK).json(grpacess);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

module.exports = { getAll, getById, create, update, deleteEntity }
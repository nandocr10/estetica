const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status");

const prisma = new PrismaClient()

async function getAll(req, res) {
    try {

        const grupo = await prisma.grupo.findMany()

        return res.status(httpStatus.OK).json(grupo);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

async function getById(req, res) {
    try {
        const grupo = await prisma.grupo.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        
        if (!grupo) {
            return res.status(httpStatus.NOT_FOUND).send("Usuário não encontrado");
        }

        return res.status(httpStatus.OK).json(grupo);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição");
    }
}

async function create(req, res) {
    try {
        const grupo = await prisma.grupo.create({
            data: {
                nome: req.body.nome,               
            }
        });

        res.status(httpStatus.OK).json(grupo);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }

    console.log(req.params.description);

}

async function update(req, res) {

    try {

        const grupo = await prisma.grupo.update({
            data: req.body,
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).json(grupo);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {
        const grupo = await prisma.grupo.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).json(grupo);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

module.exports = { getAll, getById, create, update, deleteEntity }
const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status");

const prisma = new PrismaClient()

async function getAll(req, res) {
    try {

        const categories = await prisma.category.findMany()

        return res.status(httpStatus.OK).json(categories);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

async function getById(req, res) {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!category) {
            return res.status(httpStatus.NOT_FOUND).send("Categoria não encontrada");
        }

        return res.status(httpStatus.OK).json(category);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição");
    }
}

async function create(req, res) {
    try {
        const category = await prisma.category.create({
            data: {
                description: req.body.description,
            }
        });

        res.status(httpStatus.OK).json(category);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }

    console.log(req.params.description);

}

async function update(req, res) {

    try {

        const category = await prisma.category.update({
            data: req.body,
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).json(category);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {
        const category = await prisma.category.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).json(category);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

module.exports = { getAll, getById, create, update, deleteEntity }
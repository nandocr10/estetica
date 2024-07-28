const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status");

const prisma = new PrismaClient()

async function getAll(req, res) {
    try {
        const activities = await prisma.activity.findMany({
            include: {
                user: true,
                category: true
            }
        });

        res.status(httpStatus.OK).json(activities);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição");
    }
}

async function getById(req, res) {
    try {
        const activity = await prisma.activity.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                user: true,
                category: true
            }
        });

        if (!activity) {
            return res.status(httpStatus.NOT_FOUND).send("Atividade não encontrada");
        }

        return res.status(httpStatus.OK).json(activity);
    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição");
    }
}

async function create(req, res) {
    try {
        const activity = await prisma.activity.create({
            data: {
                description: req.body.description,
                userId: req.body.userId,
                categoryId: req.body.categoryId,
            }
        });

        res.status(httpStatus.OK).json(activity);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }

    console.log(req.params.description);

}

async function update(req, res) {

    try {

        const activity = await prisma.activity.update({
            data: req.body,
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).json(activity);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {
        const activity = await prisma.activity.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).json(activity);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

module.exports = { getAll, getById, create, update, deleteEntity }
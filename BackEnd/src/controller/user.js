const { PrismaClient } = require("@prisma/client");
const httpStatus = require("http-status");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const prisma = new PrismaClient()

async function getAll(req, res) {
    try {

        const users = await prisma.user.findMany()

        return res.status(httpStatus.OK).json(users);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }
}

async function getById(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send("Usuário não encontrado");
        }

        return res.status(httpStatus.OK).json(user);

    } catch (err) {
        console.log(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição");
    }
}

async function create(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,               
                password:hashedPassword
            }
        });

        res.status(httpStatus.OK).json(user);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Erro na requisição")
    }

    console.log(req.params.description);

}

async function update(req, res) {

    try {

        const user = await prisma.user.update({
            data: req.body,
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).json(user);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não atualizado!");
    }

}

async function deleteEntity(req, res) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(httpStatus.OK).json(user);

    } catch (error) {
        console.log(error);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Não removido!");
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    try {
        console.log(req.body);
        console.log(username);
        //const user = await prisma.user.findMany()
        
        const user = await prisma.user.findUnique({
            where: { username }
        });
        
        console.log(req.body);
        console.log(username);
        var pass = user.password;
        console.log(pass);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log(password,user.password);
        const passwordMatch = await bcrypt.compare(password, pass);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("passei ate jwt");
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAll, getById, create, update, deleteEntity, login }
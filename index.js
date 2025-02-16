const status = require('http-status');
const express = require('express')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const cors = require("cors")
const helmet = require("helmet")

const category = require('./src/routes/category')
const activity = require('./src/routes/activity')
const user = require('./src/routes/user')
const grpacess = require('./src/routes/grpacess')
const grupo = require('./src/routes/grupo')
const produtos = require('./src/routes/produtos')

app.use(cors());
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/category', category)
app.use('/activity', activity)
app.use('/user', user)
app.use('/grpacess', grpacess)
app.use('/grupo', grupo)
app.use('/produtos', produtos)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Use esse middleware nas rotas que deseja proteger
app.use('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'You are authenticated' });
});

app.listen(3000, () => {
    console.log("Server started!");
})


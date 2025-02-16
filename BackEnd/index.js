const status = require('http-status');
const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const cors = require("cors");
const helmet = require("helmet");

const category = require('./src/routes/category');
const activity = require('./src/routes/activity');
const user = require('./src/routes/user');
const grpacess = require('./src/routes/grpacess');
const grupo = require('./src/routes/grupo');
const fornecedor = require('./src/routes/fornecedor');
const cliente = require('./src/routes/cliente');
const servico = require('./src/routes/servico');  // Adicionando a rota de servico
const atendimento = require('./src/routes/atendimento');  // Adicionando a rota de atendimento
const profissional = require('./src/routes/profissional');  // Adicionando a rota de profissional
const atendServ = require('./src/routes/atendserv'); // Adicionando a nova rota para AtendServ
// Aumentar limite de tamanho permitido
app.use(express.json({ limit: '10mb' })); // Ajuste o limite conforme necessário
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrai o token corretamente
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.use('/category', authenticateToken, category);
app.use('/activity', authenticateToken, activity);
app.use('/user', user);
app.use('/grpacess', authenticateToken, grpacess);
app.use('/grupo', authenticateToken, grupo);
app.use('/fornecedor', fornecedor);
app.use('/cliente', cliente);
app.use('/servico', servico);  // Adicionando a rota para servico
app.use('/atendimento', atendimento);  // Adicionando a rota para atendimento
app.use('/profissional', profissional);  // Adicionando a rota para profissional
app.use('/atendserv',  atendServ); // Adicionando a rota para AtendServ com autenticação

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// Use esse middleware nas rotas que deseja proteger
app.use('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'You are authenticated' });
});

app.listen(3000, () => {
    console.log("Server No AR!");
});

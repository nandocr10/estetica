const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: 'Minha API',
        description: 'Descrição da API',
    },
    host: 'localhost:3000', // Substitua pelo host correto
    
};

const outputfile = './swagger.json'
const endpointsfiles = ['./index.js']

swaggerAutogen(outputfile, endpointsfiles, doc)
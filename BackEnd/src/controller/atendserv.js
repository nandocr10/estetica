const { PrismaClient } = require('@prisma/client');  
const prisma = new PrismaClient();  
const httpStatus = require('http-status');  

// Validação simples dos parâmetros  
function isValidInt(value) {  
    return !isNaN(value) && Number.isInteger(parseFloat(value));  
}  

async function getAll(req, res) {  
    try {  
        const atendimentos = await prisma.atendServ.findMany({  
            include: {  
                servico: true, // Certifique-se de que o nome do relacionamento está correto  
                profissional: true // Certifique-se de que o nome do relacionamento está correto  
            }  
        });  
        res.status(httpStatus.OK).json(atendimentos);  
    } catch (err) {  
        console.error(err);  
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar atendimentos' });  
    }  
}  

async function getById(req, res) {  
    try {  
        const { codAtend, codServ } = req.params;  

        if (!isValidInt(codAtend) || !isValidInt(codServ)) {  
            return res.status(httpStatus.BAD_REQUEST).send('Parâmetros inválidos');  
        }  

        const atendimento = await prisma.atendServ.findUnique({  
            where: {  
                CodAtend_CodServ: {  
                    CodAtend: parseInt(codAtend),  
                    CodServ: parseInt(codServ)  
                }  
            },  
            include: {  
                servico: true,  
                profissional: true  
            }  
        });  

        if (!atendimento) {  
            return res.status(httpStatus.NOT_FOUND).send('Atendimento não encontrado');  
        }  
        res.status(httpStatus.OK).json(atendimento);  
    } catch (err) {  
        console.error(err);  
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao buscar o atendimento');  
    }  
}  

const zlib = require('zlib');

// Função para compactar e converter para Base64
function compressToBase64(data) {
    if (!data) return null; // Caso o dado seja nulo ou vazio
    const buffer = Buffer.from(data, 'utf-8'); // Converte a string para buffer
    const compressed = zlib.deflateSync(buffer); // Compacta os dados
    return compressed.toString('base64'); // Converte o buffer compactado para Base64
}

async function create(req, res) {
    try {
        //console.log(req.body);
        const {
            CodAtend,
            CodServ,
            CodProf,
            DtAgen,
            FtEnt01,
            FtEnt02,
            FtRet01,
            FtRet02,
            VrServ,
            PercComis,
            Obs,
            Tppgto,
            Stapgto,
            Percdes,
            Dtpgto 
        } = req.body;

        // Compactar os campos de imagem (FtEnt01 e outros, se necessário)
        const compactedFtEnt01 = FtEnt01;
        const compactedFtEnt02 = compressToBase64(FtEnt02);
        const compactedFtRet01 = compressToBase64(FtRet01);
        const compactedFtRet02 = compressToBase64(FtRet02);
        //console.log(compactedFtEnt01);
        const atendimento = await prisma.atendServ.create({
            data: {
                CodAtend: CodAtend,
                CodServ: parseInt(CodServ),
                CodProf: CodProf ? parseInt(CodProf) : null, // Trata opcional
                DtAgen: DtAgen ? new Date(DtAgen) : null,
                FtEnt01: compactedFtEnt01,
                FtEnt02: compactedFtEnt02,
                FtRet01: compactedFtRet01,
                FtRet02: compactedFtRet02,
                VrServ: VrServ,
                PercComis: PercComis,
                Obs: Obs,
                Tppgto: Tppgto ? parseInt(Tppgto) : null,
                Stapgto: Stapgto ? parseInt(Stapgto) : null,
                Percdes: Percdes ? parseFloat(Percdes) : null,
                Dtpgto: Dtpgto ? new Date(Dtpgto) : null
            }
        });

        res.status(httpStatus.CREATED).json(atendimento);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.BAD_REQUEST).send('Erro ao criar o atendimento');
    }
}

async function update(req, res) {  
    try {  
        const { codAtend, codServ } = req.params;  

        if (!isValidInt(codAtend) || !isValidInt(codServ)) {  
            return res.status(httpStatus.BAD_REQUEST).send('Parâmetros inválidos');  
        }  

        const atendimento = await prisma.atendServ.update({  
            where: {  
                CodAtend_CodServ: {  
                    CodAtend: parseInt(codAtend),  
                    CodServ: parseInt(codServ)  
                }  
            },  
            data: {  
                CodProf: req.body.CodProf ? parseInt(req.body.CodProf) : null,  
                DtAgen: req.body.DtAgen ? new Date(req.body.DtAgen) : null,  
                FtEnt01: req.body.FtEnt01,  
                FtEnt02: req.body.FtEnt02,  
                FtRet01: req.body.FtRet01,  
                FtRet02: req.body.FtRet02,  
                VrServ: req.body.VrServ,  
                PercComis: req.body.PercComis,  
                Obs: req.body.Obs ,
                Tppgto: req.body.Tppgto ? parseInt(req.body.Tppgto) : null,
                Stapgto: req.body.Stapgto ? parseInt(req.body.Stapgto) : null,
                Percdes: req.body.Percdes ? parseFloat(req.body.Percdes) : null,
                Dtpgto: req.body.Dtpgto ? new Date(req.body.Dtpgto) : null
            }  
        });  
        res.status(httpStatus.OK).json(atendimento);  
    } catch (err) {  
        console.error(err);  
        res.status(httpStatus.BAD_REQUEST).send('Erro ao atualizar o atendimento');  
    }  
}  

async function deleteEntity(req, res) {  
    try {  
        const { codAtend, codServ } = req.params;  

        if (!isValidInt(codAtend) || !isValidInt(codServ)) {  
            return res.status(httpStatus.BAD_REQUEST).send('Parâmetros inválidos');  
        }  

        const atendimento = await prisma.atendServ.delete({  
            where: {  
                CodAtend_CodServ: {  
                    CodAtend: parseInt(codAtend),  
                    CodServ: parseInt(codServ)  
                }  
            }  
        });  
        res.status(httpStatus.OK).json(atendimento);  
    } catch (err) {  
        console.error(err);  
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro na remoção do atendimento');  
    }  
}  

module.exports = { getAll, getById, create, update, deleteEntity };
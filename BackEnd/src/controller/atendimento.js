const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');

// Função para criar um atendimento e salvar nas tabelas Atendimento e AtendServ
async function createFullAtendimento(req, res) {
    const { Codcli, DtAgen, Obs, servicos } = req.body;
    // servicos é uma lista de objetos com CodServ e CodProf
    try {
      const atendimento = await prisma.atendimento.create({
        data: {
         Codcli: parseInt(Codcli), // Garante que Codcli seja um número inteiro
          DtAgen: new Date(DtAgen), // Converte DtAgen para DateTime completo
          DtCad: new Date(),
          Obs,
          atendServ: {
            create: servicos.map(servico => ({
              CodServ: parseInt(servico.CodServ), // Converte CodServ para Int
              CodProf: parseInt(servico.CodProf), // Converte CodProf para Int
              DtAgen: new Date(DtAgen), // Converte DtAgen para DateTime completo
              Obs: servico.Obs,
            })),
          },
        },
        include: { atendServ: true },
      });
      res.json(atendimento);
    } catch (err) {
      //res.status(500).json({ error: "Erro ao criar atendimento" });
      console.error(err);
    }
  }
  
  // Função para buscar dados de clientes, serviços e profissionais
  async function getAtendimentoData(req, res) {
    try {
      const clientes = await prisma.cliente.findMany();
      const servicos = await prisma.servico.findMany();
      const profissionais = await prisma.profissional.findMany();
      res.json({ clientes, servicos, profissionais });
    } catch (err) {
      console.error(err);
      //res.status(500).json({ error: "Erro ao buscar dados para atendimento" });
    }
  }
  

// Função para obter todos os atendimentos com cliente, serviços e profissionais
async function getAll(req, res) {
    try {
        const atendimentos = await prisma.atendimento.findMany({
            include: {
                cliente: true,
                atendServ: {
                    include: {
                        servico: true,
                        profissional: true
                    }
                }
            }
        });
        res.status(httpStatus.OK).json(atendimentos);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Função para obter um atendimento pelo ID
async function getById(req, res) {
    try {
        const atendimento = await prisma.atendimento.findUnique({
            where: { CodAtend: parseInt(req.params.id) },
            include: { cliente: true }  // Inclui os dados do cliente relacionado
        });
        if (!atendimento) {
            return res.status(httpStatus.NOT_FOUND).send('Atendimento não encontrado');
        }
        res.status(httpStatus.OK).json(atendimento);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Função para criar um novo atendimento
async function create(req, res) {
    try {
        const atendimento = await prisma.atendimento.create({
            data: {
                Codcli: req.body.Codcli,
                DtAgen: req.body.DtAgen ? new Date(req.body.DtAgen) : null,
                DtCad: new Date(),
                DtVenda: req.body.DtVenda ? new Date(req.body.DtVenda) : null,
                Obs: req.body.Obs,
                Staatend: req.body.Staatend,
            }
        });
        res.status(httpStatus.CREATED).json(atendimento);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Função para atualizar um atendimento existente
async function update(req, res) {
    try {
        const atendimento = await prisma.atendimento.update({
            where: { CodAtend: parseInt(req.params.id) },
            data: {
                Codcli: req.body.Codcli,
                DtAgen: req.body.DtAgen ? new Date(req.body.DtAgen) : null,
                DtCad: req.body.DtCad ? new Date(req.body.DtCad) : null,
                DtVenda: req.body.DtVenda ? new Date(req.body.DtVenda) : null,
                Obs: req.body.Obs,
                Staatend: req.body.Staatend,   
            }
        });
        res.status(httpStatus.OK).json(atendimento);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na requisição');
    }
}

// Função para deletar um atendimento
async function deleteEntity(req, res) {
    try {
        const atendimento = await prisma.atendimento.delete({
            where: { CodAtend: parseInt(req.params.id) }
        });
        res.status(httpStatus.OK).json(atendimento);
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send('Erro na remoção');
    }
}



module.exports = { getAll, getById, create, update, deleteEntity,createFullAtendimento, getAtendimentoData  };

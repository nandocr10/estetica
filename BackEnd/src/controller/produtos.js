const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Produto
const createProduto = async (req, res) => {
  const {
    Fornecedor_id,
    DsProdt,
    NmAbr,
    DtCad,
    UnMedida,
    TpCateg,
    QtdEstoq,
    DtUltComp,
    VrUltComp,
    DtPenultComp,
    VrPenultComp
  } = req.body;
  try {
    const produto = await prisma.produto.create({
      data: {
        Fornecedor_id,
        DsProdt,
        NmAbr,
        DtCad,
        UnMedida,
        TpCateg,
        QtdEstoq,
        DtUltComp,
        VrUltComp,
        DtPenultComp,
        VrPenultComp
      },
    });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Produtos
const getProdutos = async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read One Produto
const getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) }
    });
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Produto not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Produto
const updateProduto = async (req, res) => {
  const { id } = req.params;
  const {
    Fornecedor_id,
    DsProdt,
    NmAbr,
    DtCad,
    UnMedida,
    TpCateg,
    QtdEstoq,
    DtUltComp,
    VrUltComp,
    DtPenultComp,
    VrPenultComp
  } = req.body;
  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        Fornecedor_id,
        DsProdt,
        NmAbr,
        DtCad,
        UnMedida,
        TpCateg,
        QtdEstoq,
        DtUltComp,
        VrUltComp,
        DtPenultComp,
        VrPenultComp
      },
    });
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Produto
const deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.produto.delete({
      where: { id: Number(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduto,
  getProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto
};

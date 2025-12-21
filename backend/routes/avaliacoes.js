const router = require("express").Router();
const Avaliacao = require("../models/avaliacao.model");
const { protect } = require("../middleware/authMiddleware");

// GET /avaliacoes - Lista todas as avaliações
router.get("/", async (_req, res) => {
    try {
      const avaliacoes = await Avaliacao.find();
      res.json(avaliacoes);
    } catch (err) {
      res.status(500).json({ msg: "Erro ao buscar avaliações: " + err.message });
    }
  });

// GET /avaliacoes/:id - Busca uma avaliação por ID
router.get("/:id", async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findById(req.params.id);
    if (!avaliacao) {
      return res.status(404).json({ msg: "Avaliação não encontrada" });
    }
    res.json(avaliacao);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar avaliação: " + err.message });
  }
});

// POST /avaliacoes - Cria uma nova avaliação
router.post("/", async (req, res) => {
  try {
    const novaAvaliacao = new Avaliacao({
      titulo: req.body.titulo,
      questoes: req.body.questoes,
      dataCriacao: req.body.dataCriacao || new Date(),
      respostas: req.body.respostas || {},
      status: req.body.status,
      dataResposta: req.body.dataResposta,
    });
    const saved = await novaAvaliacao.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ msg: "Erro ao criar avaliação: " + err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findById(req.params.id);
    if (!avaliacao) {
      return res.status(404).json({ msg: "Avaliação não encontrada" });
    }
    res.json(avaliacao);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar avaliação: " + err.message });
  }
});

// PUT /avaliacoes/:id - Atualiza uma avaliação existente
router.put("/:id", async (req, res) => {
  try {
    const updated = await Avaliacao.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          titulo: req.body.titulo,
          questoes: req.body.questoes,
          respostas: req.body.respostas,
          status: req.body.status,
          dataResposta: req.body.dataResposta,
        },
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ msg: "Avaliação não encontrada" });
    }
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Erro ao atualizar avaliação: " + err.message });
  }
});

// DELETE /avaliacoes/:id - Remove uma avaliação
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Avaliacao.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Avaliação não encontrada" });
    }
    res.json({ msg: "Avaliação removida com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao remover avaliação: " + err.message });
  }
});

module.exports = router;

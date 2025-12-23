const router = require("express").Router();
const Avaliacao = require("../models/avaliacao.model");
const { protect } = require("../middleware/authMiddleware");
const { requireGestor } = require("../middleware/roleMiddleware");

// GET /avaliacoes - Lista todas as avaliações
router.get("/", async (_req, res) => {
    try {
      const avaliacoes = await Avaliacao.find();
      res.json(avaliacoes);
    } catch (err) {
      res.status(500).json({ msg: "Erro ao buscar avaliações: " + err.message });
    }
  });


// GET /avaliacoes/minhas - Lista avaliações APLICADAS do usuário logado (funcionário)
router.get("/minhas", protect, async (req, res) => {
  try {
    const { cicloId, status } = req.query;
    const filtro = {
      isTemplate: false,
      avaliadoEmail: String(req.user.email || "").toLowerCase().trim(),
    };
    if (cicloId) filtro.cicloId = cicloId;
    if (status) filtro.status = status;
    const avaliacoes = await Avaliacao.find(filtro).sort({ createdAt: -1 });
    res.json(avaliacoes);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar minhas avaliações: " + err.message });
  }
});

// GET /avaliacoes/do-ciclo/:cicloId - Lista avaliações APLICADAS de um ciclo (gestor)
router.get("/do-ciclo/:cicloId", protect, requireGestor, async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.find({
      isTemplate: false,
      cicloId: req.params.cicloId,
    }).sort({ createdAt: -1 });
    res.json(avaliacoes);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar avaliações do ciclo: " + err.message });
  }
});

// PUT /avaliacoes/:id/responder - Funcionário responde sua avaliação aplicada
router.put("/:id/responder", protect, async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findById(req.params.id);
    if (!avaliacao) return res.status(404).json({ msg: "Avaliação não encontrada" });

    if (avaliacao.isTemplate) {
      return res.status(400).json({ msg: "Este ID é de um template, não de uma avaliação aplicada." });
    }

    const emailUser = String(req.user.email || "").toLowerCase().trim();
    if (String(avaliacao.avaliadoEmail || "").toLowerCase().trim() !== emailUser) {
      return res.status(403).json({ msg: "Você não tem permissão para responder esta avaliação." });
    }

    avaliacao.respostas = req.body.respostas || {};
    avaliacao.status = "Respondida";
    avaliacao.dataResposta = new Date();

    const saved = await avaliacao.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ msg: "Erro ao responder avaliação: " + err.message });
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
router.post("/", protect, requireGestor, async (req, res) => {
  try {
    const novaAvaliacao = new Avaliacao({
      isTemplate: true,
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

router.put("/:id", protect, requireGestor, async (req, res) => {
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
router.delete("/:id", protect, requireGestor, async (req, res) => {
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
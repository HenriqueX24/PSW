const router = require("express").Router();
let Ciclo = require("../models/ciclo.model");
const Avaliacao = require("../models/avaliacao.model");
const { protect } = require("../middleware/authMiddleware");
const { requireGestor } = require("../middleware/roleMiddleware");

router.route("/").post(protect, requireGestor, async (req, res) => {
  const { titulo, dataInicio, dataFim, avaliadores, avaliados, avaliacaoTemplateId } = req.body;

  if (!titulo || !dataInicio || !dataFim || !avaliadores || !avaliados || !avaliacaoTemplateId) {
    return res
      .status(400)
      .json({ msg: "Por favor, preencha os campos obrigatórios" });
  }

  try {
    const newCiclo = new Ciclo({
      titulo,
      dataInicio,
      dataFim,
      avaliadores,
      avaliados,
      avaliacaoTemplateId,
      usuario: req.user.id,
    });

    const savedCiclo = await newCiclo.save();

    // Gerar avaliações APLICADAS (instâncias) para cada avaliado usando o template escolhido.
    // Isso permite: (1) cada funcionário ter sua própria avaliação; (2) histórico funcionar; (3) controle de permissão.
    try {
      const template = await Avaliacao.findById(avaliacaoTemplateId);
      if (template) {
        await Promise.all(
          (avaliados || []).map(async (email) => {
            const emailNorm = String(email || "").toLowerCase().trim();
            if (!emailNorm) return;
            const exists = await Avaliacao.findOne({
              isTemplate: false,
              cicloId: savedCiclo._id,
              templateId: template._id,
              avaliadoEmail: emailNorm,
            });
            if (exists) return;
            await Avaliacao.create({
              titulo: template.titulo,
              questoes: template.questoes,
              respostas: {},
              status: "Pendente",
              dataCriacao: new Date(),
              isTemplate: false,
              templateId: template._id,
              cicloId: savedCiclo._id,
              avaliadoEmail: emailNorm,
            });
          })
        );
      }
    } catch (e) {
      console.warn("Falha ao gerar avaliações aplicadas:", e.message);
    }

    res.status(201).json(savedCiclo);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor: " + error.message });
  }
});

router.route("/").get(protect, async (req, res) => {
  try {
    const ciclos = await Ciclo.find({
      $or: [
        { usuario: req.user.id },
        { avaliados: req.user.email },
        { avaliadores: req.user.email },
      ],
    });

    res.status(200).json(ciclos);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor: " + error.message });
  }
});

module.exports = router;
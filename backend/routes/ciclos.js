const router = require("express").Router();
let Ciclo = require("../models/ciclo.model");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, async (req, res) => {
  const { titulo, dataInicio, dataFim, status } = req.body;

  if (!titulo || !dataInicio || !dataFim) {
    return res
      .status(400)
      .json({ msg: "Por favor, preencha os campos obrigatórios" });
  }

  try {
    const newCiclo = new Ciclo({
      titulo,
      dataInicio,
      dataFim,
      status,
      usuario: req.user.id,
    });

    const savedCiclo = await newCiclo.save();
    res.status(201).json(savedCiclo);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor: " + error.message });
  }
});
router.route("/").get(protect, async (req, res) => {
  try {
    const ciclos = await Ciclo.find({ usuario: req.user.id });

    res.status(200).json(ciclos);
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor: " + error.message });
  }
});

module.exports = router;

const router = require('express').Router();
let Meta = require('../models/Meta.model'); 


router.route('/').get((req, res) => {
  Meta.find()
    .then(metas => res.json(metas))
    .catch(err => res.status(400).json('Erro: ' + err));
});


router.route('/').post((req, res) => {
  const { titulo, descricao, periodo, responsavel, status } = req.body;

  const novaMeta = new Meta({
    titulo,
    descricao,
    inicio,
    termino,
    responsavel,
    status
  });

  novaMeta.save()
    .then(metaSalva => res.json(metaSalva)) 
    .catch(err => res.status(400).json('Erro: ' + err));
});


router.route('/:id').get((req, res) => {
  Meta.findById(req.params.id)
    .then(meta => res.json(meta))
    .catch(err => res.status(400).json('Erro: ' + err));
});

router.route('/:id').put(async (req, res) => {
  try {
    const meta = await Meta.findById(req.params.id);
    if (!meta) return res.status(404).json('Meta não encontrada.');

    meta.titulo = req.body.titulo || meta.titulo;
    meta.descricao = req.body.descricao || meta.descricao;
    meta.periodo = req.body.periodo || meta.periodo;
    meta.responsavel = req.body.responsavel || meta.responsavel;
    meta.status = req.body.status || meta.status;

    const metaAtualizada = await meta.save();
    res.json(metaAtualizada);
  } catch (err) {
    res.status(400).json('Erro: ' + err);
  }
});

router.route('/:id').delete((req, res) => {
  Meta.findByIdAndDelete(req.params.id)
    .then(() => res.json('Meta deletada.'))
    .catch(err => res.status(400).json('Erro: ' + err));
});

module.exports = router;
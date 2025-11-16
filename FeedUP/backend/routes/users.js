const router = require('express').Router();
let User = require('../models/user.model'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Erro: ' + err));
});


router.route('/add').post((req, res) => {
  const { nome, cpf, email, senha, cargo } = req.body;

  const newUser = new User({
    nome,
    cpf,
    email,
    senha, 
    cargo,
  });

  newUser.save()
    .then(() => res.json('Usuário adicionado!'))
    .catch(err => res.status(400).json('Erro: ' + err));
});


router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Erro: ' + err));
});
router.route('/login').post(async (req, res) => {
  const { email, senha } = req.body;

 if (!email || !senha) {
    return res.status(400).json({ msg: 'Por favor, forneça email e senha.' });
  }

  try {
   
    const user = await User.findOne({ email }).select('+senha');

    
    if (!user) {
    
      return res.status(401).json({ msg: 'Credenciais inválidas' }); 
    }

  
    const isMatch = await user.comparePassword(senha);

    if (!isMatch) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const payload = {
      id: user._id,
      nome: user.nome,
      cargo: user.cargo
  
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;
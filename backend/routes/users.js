const router = require('express').Router();
let User = require('../models/user.model'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const { protect } = require('../middleware/authMiddleware');

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
        cargo: user.cargo,
        cpf: user.cpf
      }
    });
    
router.get('/profile', protect, async (req, res) => {
    if (req.user) {
        res.json({
            id: req.user._id,
            nome: req.user.nome,
            email: req.user.email,
            cpf: req.user.cpf,
            cargo: req.user.cargo,
        });
    } else {
        res.status(404).json({ msg: 'Usuário não encontrado' });
    }
});

router.put('/profile', protect, async (req, res) => {
   
    const user = await User.findById(req.user._id).select('+senha');

    if (user) {
        user.nome = req.body.nome || user.nome;
        user.email = req.body.email || user.email;
        user.cpf = req.body.cpf || user.cpf;
        
        if (req.body.senha) {

             user.senha = req.body.senha; 
        }

        try {
            
            const updatedUser = await user.save();
             const payload = {
                id: updatedUser._id,
                nome: updatedUser.nome,
                cargo: updatedUser.cargo
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

            res.json({
                id: updatedUser._id,
                nome: updatedUser.nome,
                email: updatedUser.email,
                cpf: updatedUser.cpf,
                cargo: updatedUser.cargo,
                token: token 
            });

        } catch (error) {
             res.status(400).json({ msg: 'Erro ao atualizar perfil: ' + error.message });
        }

    } else {
        res.status(404).json({ msg: 'Usuário não encontrado' });
    }
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;
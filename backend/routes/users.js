const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { protect } = require('../middleware/authMiddleware');

const signToken = (user) =>
  jwt.sign(
    { id: user._id, nome: user.nome, cargo: user.cargo },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

// GET /users
router.get('/', async (_req, res) => {
  try {
    const users = await User.find().select('-senha');
    res.json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// POST /users (criar conta)
router.post('/', async (req, res) => {
  const { nome, cpf, email, senha, cargo } = req.body;

  if (!nome || !cpf || !email || !senha || !cargo) {
    return res
      .status(400)
      .json({ msg: 'Preencha nome, cpf, email, senha e cargo.' });
  }

  try {
    const emailLower = String(email).toLowerCase();

    const [emailExists, cpfExists] = await Promise.all([
      User.findOne({ email: emailLower }),
      User.findOne({ cpf }),
    ]);

    if (emailExists) return res.status(409).json({ msg: 'Email já cadastrado.' });
    if (cpfExists) return res.status(409).json({ msg: 'CPF já cadastrado.' });

    const user = await User.create({
      nome,
      cpf,
      email: emailLower,
      senha, // será hash no pre('save') do schema
      cargo,
    });

    // Retorna o usuário criado (sem senha). Sem token aqui porque o teu front manda pra tela de login.
    res.status(201).json({
      _id: user._id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      cargo: user.cargo,
    });
  } catch (err) {
    // Erros de unique index do Mongo (E11000)
    if (err && err.code === 11000) {
      const field = Object.keys(err.keyPattern || err.keyValue || {})[0] || 'campo';
      return res.status(409).json({ msg: `${field} já cadastrado.` });
    }

    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// POST /users/login
router.post('/login', async (req, res) => {
  const identifier = req.body.identifier ?? req.body.email; // front manda "email" mesmo
  const { senha } = req.body;

  if (!identifier || !senha) {
    return res.status(400).json({ msg: 'Por favor, forneça email/CPF e senha.' });
  }

  try {
    const idStr = String(identifier);
    const emailLower = idStr.includes('@') ? idStr.toLowerCase() : idStr;

    const user = await User.findOne({
      $or: [{ email: emailLower }, { cpf: idStr }],
    }).select('+senha');

    if (!user) return res.status(401).json({ msg: 'Credenciais inválidas' });

    const isMatch = await user.comparePassword(senha);
    if (!isMatch) return res.status(401).json({ msg: 'Credenciais inválidas' });

    const token = signToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        cpf: user.cpf,
      },
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// GET /users/profile
router.get('/profile', protect, async (req, res) => {
  // authMiddleware já colocou req.user
  res.json({
    id: req.user._id,
    nome: req.user.nome,
    email: req.user.email,
    cpf: req.user.cpf,
    cargo: req.user.cargo,
  });
});

// PUT /users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('+senha');
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    user.nome = req.body.nome ?? user.nome;
    user.email = req.body.email ? String(req.body.email).toLowerCase() : user.email;
    user.cpf = req.body.cpf ?? user.cpf;
    user.cargo = req.body.cargo ?? user.cargo;
    if (req.body.senha) user.senha = req.body.senha;

    const updated = await user.save();
    const token = signToken(updated);

    res.json({
      token,
      user: {
        id: updated._id,
        nome: updated.nome,
        email: updated.email,
        cpf: updated.cpf,
        cargo: updated.cargo,
      },
    });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-senha');
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: 'ID inválido' });
  }
});

// DELETE /users/:id (o front chama isso)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Usuário não encontrado' });
    res.json({ msg: 'Usuário deletado.' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(400).json({ msg: 'ID inválido' });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const protect = async (req, res, next) => {
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
     
      token = req.headers.authorization.split(' ')[1];

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-senha');

      if (!req.user) {
         return res.status(401).json({ msg: 'Usuário do token não encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Token inválido, autorização negada' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }
};

module.exports = { protect };
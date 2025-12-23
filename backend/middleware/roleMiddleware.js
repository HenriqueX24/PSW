// middleware/roleMiddleware.js
// Checagem simples de cargo (role) usando o req.user já preenchido pelo protect.

const requireGestor = (req, res, next) => {
  if (!req.user || req.user.cargo !== "gestor") {
    return res.status(403).json({ msg: "Acesso restrito: apenas gestor." });
  }
  next();
};

module.exports = { requireGestor };

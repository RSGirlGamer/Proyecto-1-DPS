const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');

const checkPermission = (permission) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    
    // Verificar permisos en la base de datos
    // de la tabla permisos
    next();
  });
};

module.exports = { checkPermission };

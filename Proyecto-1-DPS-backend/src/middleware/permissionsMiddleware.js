const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');
const UsuarioRol = require('../models/userRoleModel');
const Permission = require('../models/permissionModel');

const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Token inválido' });

      const userId = decoded.id;

      // Obtener el rol del usuario
      UsuarioRol.getByUserId(userId, (err, roles) => {
        if (err) return res.status(500).json({ message: 'Error al obtener el rol' });

        const rol_id = roles[0].rol_id; // Asume que el usuario solo tiene un rol

        // Verificar los permisos del rol
        Permission.getByRoleId(rol_id, (err, permissions) => {
          if (err) return res.status(500).json({ message: 'Error al verificar permisos' });

          if (permissions.length > 0) {
            const rolePermissions = permissions[0]; // Asumimos que obtenemos un único conjunto de permisos

            console.log('Permisos obtenidos: ', rolePermissions);

            // Verifica si el permiso solicitado está habilitado (1) o deshabilitado (0)
            if (rolePermissions[requiredPermission] === 1) {
              next();
            } else {
              res.status(403).json({ message: 'Permiso denegado' });
            }
          } else {
            res.status(403).json({ message: 'No se encontraron permisos para este rol' });
          }
        });
      });
    });
  };
};

module.exports = { checkPermission };

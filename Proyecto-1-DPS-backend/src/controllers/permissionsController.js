const Permission = require('../models/permissionModel');
const UserRole = require('../models/userRoleModel');

// Maneja la solicitud para obtener permisos por ID de rol.
const getPermissionsByRoleId = (req, res) => {
  const { rol_id } = req.params;
  Permission.getByRoleId(rol_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
};

// Maneja la solicitud para crear nuevos permisos.
const createPermissions = (req, res) => {
  const permissions = req.body;
  Permission.create(permissions, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Permisos creados' });
  })
}

// Maneja la solicitud para actualizar permisos asociados a un rol específico.
const updatePermissions = (req, res) => {
  const { rol_id } = req.params;
  const permissions = req.body;
  Permission.update(rol_id, permissions, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Permisos actualizados' });
  });
};

// Maneja la solicitud para obtener permisos de un usuario por su ID.
const getPermissionAuth = (req, res) => {
  const { user_id } = req.params;
  UserRole.getUserRolePermission(user_id, (err, result) => {
    if (err) return res.status(500).json({error: err});
    res.status(200).json(result)
  })
}

module.exports = {
  getPermissionsByRoleId,
  updatePermissions,
  createPermissions,
  getPermissionAuth
};

const Permission = require('../models/permissionModel');

const getPermissionsByRoleId = (req, res) => {
  const { rol_id } = req.params;
  Permission.getByRoleId(rol_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
};

const updatePermissions = (req, res) => {
  const { rol_id } = req.params;
  const permissions = req.body;
  Permission.update(rol_id, permissions, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Permisos actualizados' });
  });
};

module.exports = {
  getPermissionsByRoleId,
  updatePermissions
};

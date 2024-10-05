// const Role = require('../models/roleModel');

// const getComments = (req, res) => {
//   Role.getAll((err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(200).json(results);
//   });
// };

// const createRole = (req, res) => {
//   const role = req.body;
//   Role.create(role, (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ message: 'Rol creado', id: result.insertId });
//   });
// };

// module.exports = {
//   getAllRoles,
//   getRoleById,
//   createRole,
//   updateRole,
//   deleteRole
// };

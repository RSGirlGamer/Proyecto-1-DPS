const Role = require('../models/roleModel');

// Maneja la solicitud para obtener todos los roles.
const getAllRoles = (req, res) => {
  Role.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

// Maneja la solicitud para obtener un rol por su ID.
const getRoleById = (req, res) => {
  const { id } = req.params;
  Role.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });
    res.status(200).json(result[0]);
  });
};

// Maneja la solicitud para crear un nuevo rol.
const createRole = (req, res) => {
  const role = req.body;
  Role.create(role, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Rol creado', id: result.insertId });
  });
};

// Maneja la solicitud para actualizar un rol existente.
const updateRole = (req, res) => {
  const { id } = req.params;
  const role = req.body;
  Role.update(id, role, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Rol actualizado' });
  });
};

// Maneja la solicitud para eliminar un rol por su ID.
const deleteRole = (req, res) => {
  const { id } = req.params;
  Role.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Rol eliminado' });
  });
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};

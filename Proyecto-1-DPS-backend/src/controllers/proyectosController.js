const Proyecto = require('../models/proyectoModel');
const UserProjectModel = require('../models/userProjectModel');

// Maneja la solicitud para obtener todos los proyectos.
const getAllProyectos = (req, res) => {
  Proyecto.getAll((err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(resultados);
  });
};

// Maneja la solicitud para obtener un proyecto por su ID.
const getProyectoById = (req, res) => {
  const { id } = req.params;
  Proyecto.getById(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    if (!resultado.length) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.status(200).json(resultado[0]);
  });
};

// Maneja la solicitud para obtener usuarios asociados a un proyecto.
const getUsersByProject = (req, res) => {
  const { id } = req.params;
  UserProjectModel.getUsers(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json(resultado);
  })
}

// Maneja la solicitud para agregar un nuevo integrante a un proyecto.
const createIntegrantesInProject = (req, res) => {
  const nuevoIntegranteProjecto = req.body;
  UserProjectModel.create(nuevoIntegranteProjecto, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Proyecto creado', id: resultado.insertId });
  })
}

// Maneja la solicitud para crear un nuevo proyecto.
const createProyecto = (req, res) => {
  const nuevoProyecto = req.body;
  Proyecto.create(nuevoProyecto, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Proyecto creado', id: resultado.insertId });
  });
};

// Maneja la solicitud para actualizar un proyecto.
const updateProyecto = (req, res) => {
  const { id } = req.params;
  const actualizacion = req.body;
  Proyecto.update(id, actualizacion, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Proyecto actualizado' });
  });
};

// Maneja la solicitud para eliminar un proyecto.
const deleteProyecto = (req, res) => {
  const { id } = req.params;
  Proyecto.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Proyecto eliminado' });
  });
};

// Maneja la solicitud para eliminar un integrante.
const deleteMember = (req, res) => {
  const { userId, projectId } = req.params;

  UserProjectModel.delete(userId, projectId, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Proyecto eliminado' });
  })
}

module.exports = {
  getAllProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  createIntegrantesInProject,
  getUsersByProject,
  deleteMember
};

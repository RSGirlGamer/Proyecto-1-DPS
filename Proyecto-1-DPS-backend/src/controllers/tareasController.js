const Tarea = require('../models/tareaModel');

// Obtener todas las tareas
const getAllTareas = (req, res) => {
  Tarea.getAll((err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(resultado);
  });
};

// Obtener una tarea por ID
const getTareaById = (req, res) => {
  const { id } = req.params;
  Tarea.getById(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    if (!resultado.length) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(200).json(resultado[0]);
  });
};

// Crear una nueva tarea
const createTarea = (req, res) => {
  const { nombre, descripcion, estado, id_proyecto, asignado_a } = req.body;

  // Verificar si el usuario asignado existe
  Usuario.getById(asignado_a, (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error en la búsqueda de usuario' });
    if (!usuario.length) return res.status(400).json({ error: 'Usuario no encontrado' });

    // Crear la tarea si todo es válido
    const nuevaTarea = { nombre, descripcion, estado, id_proyecto, asignado_a };
    Tarea.create(nuevaTarea, (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Tarea creada', id: resultado.insertId });
    });
  });
};


// Actualizar una tarea existente
const updateTarea = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado, id_proyecto } = req.body;
  const actualizacion = { nombre, descripcion, estado, id_proyecto };
  Tarea.update(id, actualizacion, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Tarea actualizada' });
  });
};

// Eliminar una tarea
const deleteTarea = (req, res) => {
  const { id } = req.params;
  Tarea.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Tarea eliminada' });
  });
};

module.exports = {
  getAllTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea
};

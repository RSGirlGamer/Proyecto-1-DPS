const Tarea = require('../models/tareaModel');
const Usuario = require('../models/usuarioModel') //faltaba importar usuario

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
  const { titulo, descripcion, proyecto_id, asignado_a,prioridad } = req.body; //cambio de nombres de variables para que hagan match con la bd, agregue la prioridad

  // Verificar si el usuario asignado existe
  Usuario.getById(asignado_a, (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error en la búsqueda de usuario' });
    if (!usuario.length) return res.status(400).json({ error: 'Usuario no encontrado' });

    // Crear la tarea si todo es válido
    const nuevaTarea = { titulo, descripcion, proyecto_id, asignado_a,prioridad }; //removi estado de aca para que se cree como pendiente por default
    Tarea.create(nuevaTarea, (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Tarea creada', id: resultado.insertId });
    });
  });
};


// Actualizar una tarea existente
const updateTarea = (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado, prioridad, proyecto_id } = req.body;
  const actualizacion = { titulo, descripcion, estado, prioridad, proyecto_id };
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

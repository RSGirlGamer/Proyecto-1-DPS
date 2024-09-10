const Proyecto = require('../models/proyectoModel');

const getAllProyectos = (req, res) => {
  Proyecto.getAll((err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(resultados);
  });
};

const getProyectoById = (req, res) => {
  const { id } = req.params;
  Proyecto.getById(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    if (!resultado.length) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.status(200).json(resultado[0]);
  });
};

const createProyecto = (req, res) => {
  const nuevoProyecto = req.body;
  Proyecto.create(nuevoProyecto, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Proyecto creado', id: resultado.insertId });
  });
};

const updateProyecto = (req, res) => {
  const { id } = req.params;
  const actualizacion = req.body;
  Proyecto.update(id, actualizacion, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Proyecto actualizado' });
  });
};

const deleteProyecto = (req, res) => {
  const { id } = req.params;
  Proyecto.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Proyecto eliminado' });
  });
};

module.exports = {
  getAllProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto
};

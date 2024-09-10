const db = require('../config/db');

const Proyecto = {
  getAll: (callback) => {
    db.query('SELECT * FROM proyectos', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM proyectos WHERE id = ?', [id], callback);
  },
  create: (nuevoProyecto, callback) => {
    db.query('INSERT INTO proyectos SET ?', nuevoProyecto, callback);
  },
  update: (id, actualizacion, callback) => {
    db.query('UPDATE proyectos SET ? WHERE id = ?', [actualizacion, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM proyectos WHERE id = ?', [id], callback);
  }
};

module.exports = Proyecto;

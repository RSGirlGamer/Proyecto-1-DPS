const db = require('../api/config/db');

const Tarea = {
  getAll: (callback) => {
    db.query('SELECT * FROM tareas', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM tareas WHERE id = ?', [id], callback);
  },
  create: (nuevaTarea, callback) => {
    db.query('INSERT INTO tareas SET ?', nuevaTarea, callback);
  },
  update: (id, actualizacion, callback) => {
    db.query('UPDATE tareas SET ? WHERE id = ?', [actualizacion, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM tareas WHERE id = ?', [id], callback);
  },
  getTasks:(callback)=>{
    db.query('SELECT * FROM taskByProject',callback);
  },
  getTasksByProjectId:(id,callback)=>{
    db.query('SELECT * FROM tareas WHERE proyecto_id = ?',[id],callback);
  }
};

module.exports = Tarea;

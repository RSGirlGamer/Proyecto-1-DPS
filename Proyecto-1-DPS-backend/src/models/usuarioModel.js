const db = require('../config/db');

const Usuario = {
  getAll: (callback) => {
    db.query('SELECT * FROM usuarios', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
  },
  getByEmail: (email, callback) => {
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], callback);
  },
  create: (nuevoUsuario, callback) => {
    db.query('INSERT INTO usuarios SET ?', nuevoUsuario, callback);
  },
  update: (id, actualizacion, callback) => {
    db.query('UPDATE usuarios SET ? WHERE id = ?', [actualizacion, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
  }
};

module.exports = Usuario;

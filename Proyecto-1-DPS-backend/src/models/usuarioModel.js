const db = require('../config/db');

const Usuario = {
  getAll: (callback) => {
    db.query('SELECT * FROM allUsersInclRole', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM allUsersInclRole WHERE id = ?', [id], callback);
  },
  getTasksByUser: (callback) => {
    db.query('SELECT * FROM tasksByUser', callback);
  },
  getByEmail: (email, callback) => {
    db.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [email], callback);
  },
  create: (nuevoUsuario, callback) => {
    const { nombre, nombre_usuario, correo_electronico, contrasena } = nuevoUsuario;
    console.log('Usuario nuevo: ', nuevoUsuario);
    db.query('INSERT INTO usuarios (nombre_usuario, nombre_completo, contrasena, correo_electronico) VALUES(?,?,?,?)', 
      [nombre_usuario, nombre, contrasena, correo_electronico], callback);
  },
  update: (id, nombre_completo,nombre_usuario,correo_electronico, callback) => {
    db.query('UPDATE usuarios SET  nombre_completo = ?, nombre_usuario = ?, correo_electronico = ? WHERE id = ?', [nombre_completo,nombre_usuario,correo_electronico, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
  }
};

module.exports = Usuario;

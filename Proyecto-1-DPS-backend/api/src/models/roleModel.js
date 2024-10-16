const db = require('../api/config/db');

class Role {
  static getAll(callback) {
    db.query('SELECT * FROM roles', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM roles WHERE id = ?', [id], callback);
  }

  static create(role, callback) {
    db.query('INSERT INTO roles SET ?', role, callback);
  }

  static update(id, role, callback) {
    db.query('UPDATE roles SET ? WHERE id = ?', [role, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM roles WHERE id = ?', [id], callback);
  }
}

module.exports = Role;

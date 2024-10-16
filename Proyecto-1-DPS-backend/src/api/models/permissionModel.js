const db = require('../api/config/db');

class Permission {
  static getByRoleId(roleId, callback) {
    db.query('SELECT * FROM permisos WHERE rol_id = ?', [roleId], callback);
  }

  static create(permissions, callback) {
    db.query('INSERT INTO permisos SET ?', [permissions], callback);
  }

  static update(roleId, permissions, callback) {
    db.query('UPDATE permisos SET ? WHERE rol_id = ?', [permissions, roleId], callback);
  }
}

module.exports = Permission;

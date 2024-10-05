const db = require('../config/db');

class Permission {
  static getByRoleId(roleId, callback) {
    db.query('SELECT * FROM permisos WHERE rol_id = ?', [roleId], callback);
  }

  static update(roleId, permissions, callback) {
    db.query('UPDATE permisos SET ? WHERE rol_id = ?', [permissions, roleId], callback);
  }
}

module.exports = Permission;

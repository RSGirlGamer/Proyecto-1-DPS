const db = require('../config/db');

class UserRole {
  static getByUserId(userId, callback) {
    db.query('SELECT * FROM usuario_roles WHERE usuario_id = ?', [userId], callback);
  }

  static assignRole(userId, roleId, callback) {
    db.query('INSERT INTO usuario_roles (usuario_id, rol_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE rol_id = ?', [userId, roleId, roleId], callback);
  }
  
  static removeRole(userId, roleId, callback) {
    db.query('DELETE FROM usuario_roles WHERE usuario_id = ? AND rol_id = ?', [userId, roleId], callback);
  }
  static changeRole(userId,roleId, callback){
    db.query('UPDATE usuario_roles SET rol_id = ? WHERE usuario_id = ?', [roleId,userId], callback);
  }
}

module.exports = UserRole;

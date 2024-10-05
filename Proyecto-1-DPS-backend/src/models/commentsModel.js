const db = require('../config/db');

class Comments {
  static create(userId, taskId, commentary, callback) {
    db.query('INSERT INTO comentarios (id_user, id_task, comment) VALUES (?, ?, ?)', [userId, taskId, commentary], callback);
  }
}

module.exports = Comments;
const db = require('../api/config/db');

class Comments {
  static get(projectID, callback) {
    db.query('SELECT * FROM comentarios WHERE id_project = ?', [projectID], callback)
  }

  static create(comment, callback) {
    db.query('INSERT INTO comentarios (id_user, id_project, comment) VALUES (?, ?, ?)', [comment.userId, comment.projectID, comment.comment], callback);
  }
}

module.exports = Comments;
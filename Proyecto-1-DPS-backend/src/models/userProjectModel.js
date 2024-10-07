const db = require('../config/db');

class UserProjectModel {

  static getUsers(id, callback) {
    db.query('SELECT * FROM usersbyproject WHERE project_id = ?', [id], callback)
  }

  static create(userProject, callback) {
    db.query('INSERT INTO proyectos_usuarios (user_id, project_id) VALUES (?, ?)', [userProject.userId, userProject.projectId], callback);
  }

  static delete(userId, projectId, callback) {
    db.query('DELETE FROM proyectos_usuarios WHERE user_id = ? AND project_id = ?', [userId, projectId], callback);
  }
}

module.exports = UserProjectModel;
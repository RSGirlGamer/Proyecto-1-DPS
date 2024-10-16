const mysql = require('mysql2');
require('dotenv').config();


console.log('DB_USER:', process.env.DB_USER);

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'dps_project_admin_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = connection;

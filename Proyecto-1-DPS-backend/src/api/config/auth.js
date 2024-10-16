require('dotenv').config();

// Archivo de configuracion para autenticacion
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
  };
  
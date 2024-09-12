const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/auth');
const Usuario = require('../models/usuarioModel');

// Registrar un nuevo usuario
const registerUsuario = (req, res) => {
  const { nombre, nombre_usuario, email, password, rol } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err });
    
    const nuevoUsuario = { nombre, nombre_usuario, email, password: hashedPassword, rol };
    Usuario.create(nuevoUsuario, (err, resultado) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Usuario creado', id: resultado.insertId });
    });
  });
};

// Iniciar sesion
const loginUsuario = (req, res) => {
  const { email, password } = req.body;
  Usuario.getByEmail(email, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    if (!resultado.length) return res.status(401).json({ message: 'Usuario no encontrado' });
    
    const usuario = resultado[0];
    bcrypt.compare(password, usuario.contrasena, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });
      
      const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      res.status(200).json({ token });
    });
  });
};

// Obtener informacion del usuario actual
const getUsuario = (req, res) => {
  const { id } = req.user;
  Usuario.getById(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    if (!resultado.length) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(resultado[0]);
  });
};

const getAllUsuarios = (req, res) => {
  Usuario.getAll((err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(resultados);
  });
};

module.exports = {
  registerUsuario,
  loginUsuario,
  getUsuario,
  getAllUsuarios
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/auth');
const Usuario = require('../models/usuarioModel');
const UserRole = require('../models/userRoleModel');

// Registrar un nuevo usuario y asignar un rol
const registerUsuario = (req, res) => {
  const { nombre, nombre_usuario, correo_electronico, contrasena, rol_id } = req.body;

  // Hash de la contraseña
  bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err });

    const nuevoUsuario = { nombre, nombre_usuario, correo_electronico, contrasena: hashedPassword };

    // Crear el usuario
    Usuario.create(nuevoUsuario, (err, resultado) => {
      if (err) return res.status(500).json({ error: err });

      const usuarioId = resultado.insertId;

      // Asignar el rol
      UserRole.assignRole(usuarioId, rol_id, (err) => {
        if (err) return res.status(500).json({ error: 'Error al asignar el rol' });
        res.status(201).json({ message: 'Usuario creado y rol asignado', id: usuarioId });
      });
    });
  });
};

// Iniciar sesión
const loginUsuario = (req, res) => {
  const { correo_electronico, contrasena } = req.body;

  Usuario.getByEmail(correo_electronico, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    if (!resultado.length) return res.status(401).json({ message: 'Usuario no encontrado' });

    const usuario = resultado[0];

    // Comparar la contraseña
    bcrypt.compare(contrasena, usuario.contrasena, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

      // Obtener el rol del usuario
      UserRole.getByUserId(usuario.id, (err, roles) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el rol' });
        const rol_id = roles[0].rol_id;

        // Incluir el rol en el token JWT
        const token = jwt.sign({ id: usuario.id, rol_id: rol_id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({ token });
      });
    });
  });
};

// Obtener todos los usuarios
const getAllUsuarios = (req, res) => {
  Usuario.getAll((err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(resultados);
  });
};

// Obtener un usuario por ID
const getUsuarioById = (req, res) => {
  const { id } = req.params;
  Usuario.getById(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    if (!resultado.length) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(resultado[0]);
  });
};

// Modificar los datos de un usuario (excepto la contraseña)
const updateUsuario = (req, res) => {
  const { id } = req.params;
  const actualizacion = req.body;
  Usuario.update(id, actualizacion, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Usuario actualizado' });
  });
};

// Cambiar la contraseña de un usuario
const updatePassword = (req, res) => {
  const { id } = req.params;
  const { contrasena } = req.body;

  bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err });

    Usuario.updatePassword(id, hashedPassword, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'Contraseña actualizada' });
    });
  });
};

// Modificar el rol de un usuario
const updateUsuarioRole = (req, res) => {
  const { id } = req.params;
  const { rol_id } = req.body;

  UserRole.assignRole(id, rol_id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al asignar el rol' });
    res.status(200).json({ message: 'Rol actualizado' });
  });
};

// Eliminar un usuario
const deleteUsuario = (req, res) => {
  const { id } = req.params;

  // Primero eliminamos el rol del usuario en la tabla usuario_roles
  UserRole.removeRole(id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el rol del usuario' });

    // Luego eliminamos al usuario en la tabla usuarios
    Usuario.delete(id, (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar el usuario' });

      res.status(200).json({ message: 'Usuario y roles eliminados exitosamente' });
    });
  });
};


module.exports = {
  registerUsuario,
  loginUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  updatePassword,
  updateUsuarioRole,
  deleteUsuario
};

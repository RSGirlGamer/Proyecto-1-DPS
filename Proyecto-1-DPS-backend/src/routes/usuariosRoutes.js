const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionsMiddleware');

router.post('/registrar', usuariosController.registerUsuario);
router.post('/login', usuariosController.loginUsuario);
router.get('/me', authenticateToken, usuariosController.getUsuario);
router.get('/', authenticateToken, checkPermission('ver_usuarios'), usuariosController.getAllUsuarios);

module.exports = router;

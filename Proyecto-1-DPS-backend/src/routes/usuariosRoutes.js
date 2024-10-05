const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionsMiddleware');

/**
 * @swagger
 * /api/usuarios/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               correo_electronico:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error en la creación
 */
router.post('/registrar', authenticateToken, checkPermission('puede_crear_usuarios'), usuariosController.registerUsuario);
router.post('/login', usuariosController.loginUsuario);
router.get('/tasksList', authenticateToken, checkPermission('puede_ver_usuarios'), usuariosController.getTasksByUser);
router.get('/tasksList/:id', authenticateToken, checkPermission('puede_ver_usuarios'), usuariosController.getTasksByUserById);
router.get('/', authenticateToken, checkPermission('puede_ver_usuarios'), usuariosController.getAllUsuarios);
router.get('/:id', authenticateToken, checkPermission('puede_ver_usuarios'), usuariosController.getUsuarioById);
router.put('/password/:id', authenticateToken, checkPermission('puede_editar_usuarios'), usuariosController.updatePassword);
router.delete('/:id', authenticateToken, checkPermission('puede_eliminar_usuarios'), usuariosController.deleteUsuario);
router.put('/update',authenticateToken,checkPermission('puede_editar_usuarios'), usuariosController.updateUsuarioRole);
router.put('/user', authenticateToken, checkPermission('puede_editar_usuarios'), usuariosController.updateUsuario);


module.exports = router;

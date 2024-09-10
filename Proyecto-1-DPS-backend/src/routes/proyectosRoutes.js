const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, proyectosController.getAllProyectos);
router.get('/:id', authenticateToken, proyectosController.getProyectoById);
router.post('/', authenticateToken, proyectosController.createProyecto);
router.put('/:id', authenticateToken, proyectosController.updateProyecto);
router.delete('/:id', authenticateToken, proyectosController.deleteProyecto);

module.exports = router;

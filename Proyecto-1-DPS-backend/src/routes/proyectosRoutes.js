const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, proyectosController.getAllProyectos);
router.get('/:id', authenticateToken, proyectosController.getProyectoById);
router.get('/integrantes/:id', authenticateToken, proyectosController.getUsersByProject);
router.post('/', authenticateToken, proyectosController.createProyecto);
router.post('/integrantes', authenticateToken, proyectosController.createIntegrantesInProject);
router.put('/:id', authenticateToken, proyectosController.updateProyecto);
router.delete('/:id', authenticateToken, proyectosController.deleteProyecto);
router.delete('/integrantes/:userId&:projectId', authenticateToken, proyectosController.deleteMember);


module.exports = router;

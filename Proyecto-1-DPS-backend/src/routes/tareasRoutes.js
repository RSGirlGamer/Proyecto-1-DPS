const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, tareasController.getAllTareas);
router.get('/:id', authenticateToken, tareasController.getTareaById);
router.post('/', authenticateToken, tareasController.createTarea);
router.put('/:id', authenticateToken, tareasController.updateTarea);
router.delete('/:id', authenticateToken, tareasController.deleteTarea);

module.exports = router;

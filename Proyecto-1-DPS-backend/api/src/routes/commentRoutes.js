const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/:id', authenticateToken, comentariosController.getComments);
router.post('/', authenticateToken, comentariosController.createComment);

module.exports = router;

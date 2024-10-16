const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissionsController');

router.get('/:rol_id', permissionsController.getPermissionsByRoleId);
router.post('/', permissionsController.createPermissions)
router.put('/:rol_id', permissionsController.updatePermissions);
router.get('/auth/:user_id', permissionsController.getPermissionAuth)

module.exports = router;

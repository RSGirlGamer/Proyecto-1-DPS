const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissionsController');

router.get('/:rol_id', permissionsController.getPermissionsByRoleId);
router.put('/:rol_id', permissionsController.updatePermissions);

module.exports = router;

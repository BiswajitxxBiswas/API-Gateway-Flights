const express = require('express');
const { AuthRequestMiddlewares } = require('../../middlewares');
const { UserController } = require('../../controllers');

const router = express.Router();

router.post('/signup',AuthRequestMiddlewares.validateAuthRequest, UserController.Singup );
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest, UserController.Singin );
router.post('/role',AuthRequestMiddlewares.checkAuth, AuthRequestMiddlewares.isAdmin, UserController.addRoleToUser );


module.exports = router;
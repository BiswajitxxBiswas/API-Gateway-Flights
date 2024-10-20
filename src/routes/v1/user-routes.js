const express = require('express');
const { AuthRequestMiddlewares } = require('../../middlewares');
const { UserController } = require('../../controllers');

const router = express.Router();

router.post('/signup',AuthRequestMiddlewares.validateAuthRequest, UserController.Singup );
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest, UserController.Singin );


module.exports = router;
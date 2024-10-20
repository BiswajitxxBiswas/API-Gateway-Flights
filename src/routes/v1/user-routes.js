const express = require('express');
const { AuthRequestMiddlewares } = require('../../middlewares');
const { UserController } = require('../../controllers');

const router = express.Router();

router.post('/singup',AuthRequestMiddlewares.validateAuthRequest, UserController.Singup );
router.post('/singin',AuthRequestMiddlewares.validateAuthRequest, UserController.Singin );


module.exports = router;
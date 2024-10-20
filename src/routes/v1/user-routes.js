const express = require('express');
const { UserController } = require('../../controllers');

const router = express.Router();

router.post('/singup',UserController.Singup );
router.post('/singin',UserController.Singin );


module.exports = router;
const express  = require('express');

const {infoContoller} = require('../../controllers');
const userRoutes = require('./user-routes');

const router = express.Router();

router.get('/info',infoContoller.info);
router.use('/singup',userRoutes);


module.exports = router;
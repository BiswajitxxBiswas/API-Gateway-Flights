const express  = require('express');

const {infoContoller} = require('../../controllers');
const userRoutes = require('./user-routes');

const router = express.Router();

router.get('/info',infoContoller.info);
router.use('/user',userRoutes);


module.exports = router;
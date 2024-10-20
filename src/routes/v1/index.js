const express  = require('express');

const {infoContoller} = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middlewares');
const userRoutes = require('./user-routes');

const router = express.Router();

router.get('/info',AuthRequestMiddlewares.checkAuth, infoContoller.info);
router.use('/user',userRoutes);


module.exports = router;
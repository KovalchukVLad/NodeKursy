const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/', authMiddleware.checkIsPasswordValid, authController.auth);

module.exports = router;

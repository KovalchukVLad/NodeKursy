const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/', authMiddleware.checkIsAuthDataValid, authMiddleware.checkIsPasswordValid, authController.auth);

module.exports = router;

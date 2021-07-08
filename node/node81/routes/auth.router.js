const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/login', authMiddleware.checkIsAuthDataValid, authMiddleware.checkIsPasswordValid, authController.login);

router.post('/logout', authMiddleware.checkToken(), authController.logout);

router.post('/refresh', authMiddleware.checkToken('refresh'), authController.refresh);

module.exports = router;

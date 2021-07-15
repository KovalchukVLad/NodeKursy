const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/login',
    authMiddleware.checkAuthDataValid,
    authMiddleware.checkIsPasswordValid,
    userMiddleware.isUserActive,
    authController.login);

router.post('/logout',
    authMiddleware.checkToken(),
    authController.logout);

router.post('/refresh',
    authMiddleware.checkToken('refresh'),
    authController.refresh);

module.exports = router;

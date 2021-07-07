const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.checkIsUserDataValid, userMiddleware.checkIsEmailExists, userController.createUser);

router.get('/:userId', userMiddleware.checkIsUserExists, userController.getUserById);

router.delete('/:userId', authMiddleware.checkToken(), userMiddleware.checkIsUserExists, userController.deleteUser);

router.patch('/:userId',
    userMiddleware.checkIsUserDataValidForUpdate,
    authMiddleware.checkToken(),
    userMiddleware.checkIsUserExists,
    userController.updateUser);

module.exports = router;

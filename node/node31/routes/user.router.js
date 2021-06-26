const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsUserExists, userController.getUserById);

router.post('/', userMiddleware.checkIsEmailCorrect, userController.createUser);

router.delete('/:userId', userMiddleware.checkIsUserExists, userController.deleteUser);

router.patch('/:userId', userMiddleware.checkIsUserExists, userController.updateUser);

module.exports = router;

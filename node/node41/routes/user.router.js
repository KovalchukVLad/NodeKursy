const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.checkIsDataCorrect, userController.createUser);

router.get('/:userId', userMiddleware.checkIsUserExists, userController.getUserById);

router.delete('/:userId', userMiddleware.checkIsUserExists, userController.deleteUser);

router.patch('/:userId', userMiddleware.checkIsUserExists, userController.updateUser);

module.exports = router;

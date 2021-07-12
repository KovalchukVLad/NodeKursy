const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware, fileMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userMiddleware.checkIsUserDataValid,
    userMiddleware.checkIsEmailExists,
    userController.createUser);

router.get('/:userId', userMiddleware.checkIsUserExists, userController.getUserById);

router.delete('/:userId', authMiddleware.checkToken(), userMiddleware.checkIsUserExists, userController.deleteUser);

router.patch('/:userId',
    userMiddleware.checkIsUserDataValidForUpdate,
    authMiddleware.checkToken(),
    userMiddleware.checkIsUserExists,
    userController.updateUser);

router.patch('/:userId/avatar',
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userMiddleware.checkIsUserExists,
    userController.changeAvatar);

router.patch('/:userId/gallery',
    fileMiddleware.checkFiles,
    userMiddleware.checkIsUserExists,
    userController.addToGallery);

module.exports = router;

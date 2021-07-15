const router = require('express').Router();

const { userController, userFilesController } = require('../controllers');
const {
    userMiddleware,
    tokenMiddleware,
    authMiddleware,
    filesMiddleware
} = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.validatateUserData,
    userMiddleware.checkIsEmailValid,
    userController.createUser);

router.get('/email-confirm',
    tokenMiddleware.checkEmailToken,
    userController.confirmEmail);

router.get('/:userId',
    userMiddleware.checkIsUserExists,
    userMiddleware.isUserActive,
    userController.getUserById);

router.delete('/:userId',
    authMiddleware.checkToken(),
    userMiddleware.checkYouCan(true),
    userController.deleteUser);

router.patch('/:userId/restore',
    authMiddleware.checkToken(),
    userMiddleware.checkYouCan(false),
    userController.restoreUser);

router.patch('/:userId',
    userMiddleware.checkIsUserDataValidForUpdate,
    authMiddleware.checkToken(),
    userMiddleware.checkIsUserExists,
    userController.updateUser);

router.patch('/:userId/role',
    authMiddleware.checkToken(),
    userController.changeAccess);

router.patch('/:userId/change-password',
    authMiddleware.checkToken(),
    userMiddleware.checkIsUserExists,
    userController.changePassword);

router.patch('/:userId/password-confirm',
    userMiddleware.validatePassword,
    userMiddleware.checkIsUserExists,
    tokenMiddleware.checkPasswordToken,
    userController.confirmPassword);

router.patch('/:userId/avatar',
    filesMiddleware.checkFiles,
    filesMiddleware.checkAvatar,
    authMiddleware.checkToken(),
    userMiddleware.checkIsUserExists,
    userFilesController.setAvatar);

router.patch('/:userId/gallery',
    filesMiddleware.checkFiles,
    authMiddleware.checkToken(),
    userMiddleware.checkIsUserExists,
    userFilesController.addToGallery);

router.get('/:userId/avatar',
    userMiddleware.checkIsUserExists,
    userMiddleware.isUserActive,
    userFilesController.getAvatar);

router.get('/:userId/gallery',
    userMiddleware.checkIsUserExists,
    userMiddleware.isUserActive,
    userFilesController.getGallery);

module.exports = router;

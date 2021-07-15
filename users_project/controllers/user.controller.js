const {
    emailActionsEnum: {
        CREATE,
        DELETE,
        EMAIL_CONFIRM,
        PASSWORD_CONFIRM,
        PASSWORD_CHANGE,
        RESTORE,
        UPDATE
    },
    responseCodesEnum:
        {
            BAD_REQUEST,
            CREATED,
            FORBIDDEN,
            NO_CONTENT
        },
    responseMessages: {
        CONFIRM_EMAIL,
        PASSWORD_UPDATED,
        USER_CREATED,
        USER_DELETED,
        USER_RESTORED,
        USER_UPDATED
    },
    tokenConstants:
        { CONFIRM_REGISTRATION_LINK, PASSWORD },
    userRoles
} = require('../constants');
const {
    Auth,
    EmailConfirm,
    PasswordConfirm,
    User
} = require('../database');
const {
    ErrorHandler,
    errorMessages: {
        ERROR_WITH_ACCESS,
        RECORD_NOT_FOUND
    }
} = require('../errors');
const {
    mailService,
    passwordService,
    tokenService,
    userService
} = require('../services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({ isActive: true });

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await User.findOne({ _id: userId, isActive: true });

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { email, name } = req.body;

            await EmailConfirm.deleteOne({ user: req.body });

            const emailToken = tokenService.createEmailConfirmToken();

            await EmailConfirm.create({ emailToken, user: req.body });
            await mailService.sendEmail(email, EMAIL_CONFIRM,
                { name, link: (CONFIRM_REGISTRATION_LINK.concat(emailToken)) });

            res.json(CONFIRM_EMAIL);
        } catch (e) {
            next(e);
        }
    },

    confirmEmail: async (req, res, next) => {
        try {
            const { user: { email, name }, user } = req;

            const createdUser = await userService.createUser(user);
            await mailService.sendEmail(email, CREATE, { name });

            res.status(CREATED).json({ message: USER_CREATED, createdUser });
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { email } = req.user;
            const { userId } = req.params;

            await User.updateOne({ _id: userId }, { $set: { isActive: false } });
            await Auth.deleteOne({ user: userId });

            await mailService.sendEmail(email, DELETE, { email });

            res.status(NO_CONTENT).json(USER_DELETED);
        } catch (e) {
            next(e);
        }
    },

    restoreUser: async (req, res, next) => {
        try {
            const { email } = req.user;
            const { userId } = req.params;

            await User.updateOne({ _id: userId }, { $set: { isActive: true } });

            await mailService.sendEmail(email, RESTORE, { email });

            res.json(USER_RESTORED);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user: { _id, name, email } } = req;

            await User.updateOne({ _id }, req.body);
            await mailService.sendEmail(email, UPDATE, { name, newData: JSON.stringify(req.body) });

            const user = await User.findById(_id);
            const normalizedUser = userService.userNormalizer(user.toJSON());

            res.json({ message: USER_UPDATED, normalizedUser });
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { email, name, _id } = req.user;

            const passwordToken = tokenService.createPasswordChangeConfirmToken();

            await PasswordConfirm.deleteOne({ userId: _id });

            await PasswordConfirm.create({ passwordToken, userId: _id });
            await mailService.sendEmail(email, PASSWORD_CONFIRM, { name, token: passwordToken });

            res.json(CONFIRM_EMAIL);
        } catch (e) {
            next(e);
        }
    },

    confirmPassword: async (req, res, next) => {
        try {
            const pass = req.get(PASSWORD);
            const { user: { email, _id } } = req;

            const hashedPassword = await passwordService.hash(pass);

            await User.updateOne({ _id }, { $set: { password: hashedPassword } });
            await mailService.sendEmail(email, PASSWORD_CHANGE, { email });

            res.status(CREATED).json(PASSWORD_UPDATED);
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { email, name, _id } = req.user;

            const passwordToken = tokenService.createPasswordChangeConfirmToken();

            await PasswordConfirm.deleteOne({ userId: _id });

            await PasswordConfirm.create({ passwordToken, userId: _id });
            await mailService.sendEmail(email, PASSWORD_CONFIRM, { name, token: passwordToken });

            res.json(CONFIRM_EMAIL);
        } catch (e) {
            next(e);
        }
    },

    changeAccess: async (req, res, next) => {
        try {
            const { changeRole } = req.query;
            const { role } = req.user;
            const { userId } = req.params;

            if (!Object.values(userRoles).includes(changeRole)) {
                throw new ErrorHandler(
                    BAD_REQUEST,
                    RECORD_NOT_FOUND.message,
                    RECORD_NOT_FOUND.code
                );
            }

            if (role !== userRoles.ADMIN) {
                throw new ErrorHandler(
                    FORBIDDEN,
                    ERROR_WITH_ACCESS.message,
                    ERROR_WITH_ACCESS.code
                );
            }

            await User.updateOne({ _id: userId }, { $set: { role: changeRole } });

            res.json(`role ${userId} now is ${changeRole}`);
        } catch (e) {
            next(e);
        }
    }
};

const {
    responseCodesEnum: { BAD_REQUEST, INVALID_DATA, FORBIDDEN },
    tokenConstants: { PASSWORD },
    userRoles
} = require('../constants');
const { User } = require('../database');
const {
    ErrorHandler,
    errorMessages: {
        CONFLICT_BETWEEN_TOKEN_AND_ID,
        ERROR_VALIDATION,
        ERROR_WITH_ACCESS,
        RECORD_NOT_FOUND,
        WRONG_EMAIL
    }
} = require('../errors');
const { userValidator, userIdValidator } = require('../validators');

module.exports = {
    validatateUserData: (req, res, next) => {
        try {
            const { error } = userValidator.createUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(
                    BAD_REQUEST,
                    error.details[0].message,
                    ERROR_VALIDATION.code
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailValid: async (req, res, next) => {
        try {
            const { email } = req.body;

            const isEmailAvailable = await User.findOne({ email });

            if (isEmailAvailable) {
                throw new ErrorHandler(INVALID_DATA, WRONG_EMAIL.message, WRONG_EMAIL.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserExists: async (req, res, next) => {
        try {
            const userId = req.user ? req.user._id.toString() : req.params.userId;

            if (req.user && req.user._id.toString() !== req.params.userId) {
                throw new ErrorHandler(
                    INVALID_DATA,
                    CONFLICT_BETWEEN_TOKEN_AND_ID.message,
                    CONFLICT_BETWEEN_TOKEN_AND_ID.code
                );
            }
            const { error } = userIdValidator.userId.validate(userId);

            if (error) {
                throw new ErrorHandler(
                    BAD_REQUEST,
                    error.details[0].message,
                    ERROR_VALIDATION.code
                );
            }

            const userById = await User.findById(userId);

            if (!userById) {
                throw new ErrorHandler(
                    BAD_REQUEST,
                    RECORD_NOT_FOUND.message,
                    RECORD_NOT_FOUND.code
                );
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkEmailValidForResetPassword: (req, res, next) => {
        try {
            const { userEmail } = req.query;
            const { email } = req.user;

            if (userEmail !== email) {
                throw new ErrorHandler(
                    BAD_REQUEST,
                    RECORD_NOT_FOUND.message,
                    RECORD_NOT_FOUND.code
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserDataValidForUpdate: (req, res, next) => {
        try {
            const { error } = userValidator.updateUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(
                    BAD_REQUEST,
                    error.details[0].message,
                    ERROR_VALIDATION.code
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validatePassword: (req, res, next) => {
        try {
            const password = req.get(PASSWORD);

            const { error } = userValidator.password.validate(password);

            if (error) {
                throw new ErrorHandler(
                    BAD_REQUEST,
                    error.details[0].message,
                    ERROR_VALIDATION.code
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserActive: (req, res, next) => {
        try {
            const { isActive } = req.user;

            if (!isActive) {
                throw new ErrorHandler(
                    FORBIDDEN,
                    ERROR_WITH_ACCESS.message,
                    ERROR_WITH_ACCESS.code
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkYouCan: (adminAndUser) => (req, res, next) => {
        try {
            const { userId } = req.params;
            const { _id, role } = req.user;

            if (adminAndUser) {
                if (role !== userRoles.ADMIN && userId !== _id.toString()) {
                    throw new ErrorHandler(
                        FORBIDDEN,
                        ERROR_WITH_ACCESS.message,
                        ERROR_WITH_ACCESS.code
                    );
                }
            } else if (!adminAndUser) {
                if (role !== userRoles.ADMIN) {
                    throw new ErrorHandler(
                        FORBIDDEN,
                        ERROR_WITH_ACCESS.message,
                        ERROR_WITH_ACCESS.code
                    );
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};

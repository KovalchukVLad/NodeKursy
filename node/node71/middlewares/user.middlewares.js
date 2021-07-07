const { User } = require('../dataBase');
const { responceCodesEnum: { BAD_REQUEST, INVALID_DATA } } = require('../constants');
const {
    errorMessages: {
        RECORD_NOT_FOUND, WRONG_EMAIL, ValidationError, CONFLICT_BETWEEN_TOKEN_AND_ID
    },
    ErrorHandler
} = require('../errors');
const { userValidator, userIdValidator } = require('../validators');

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            let userId;
            if (req.user) {
                userId = req.user._id.toString();

                if (req.user._id && req.user._id.toString() !== req.params.userId) {
                    throw new ErrorHandler(INVALID_DATA,
                        CONFLICT_BETWEEN_TOKEN_AND_ID.message,
                        CONFLICT_BETWEEN_TOKEN_AND_ID.code);
                }
            } else {
                userId = req.params.userId;
            }

            // Знаю що те що зверху трохи погано, але коли пишу так,
            // const userId = req.user._id.toString() || req.params.userId;
            // то якщо у мене нема req.user._id  вибиває помилку cant find _id of undefined,
            // пробував ставити req.user?._id - працює, але не знаю чи так можна, бо лінтер каже шо нє
            // просто я цю мідлвару використовую в декількох випадках, десь треба взяти одне значення десь друге

            const { error } = userIdValidator.userId.validate(userId);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message, ValidationError.code);
            }

            const userById = await User.findById(userId);

            if (!userById) {
                throw new ErrorHandler(BAD_REQUEST, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.code);
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailExists: async (req, res, next) => {
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

    checkIsUserDataValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message, ValidationError.code);
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
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message, ValidationError.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};

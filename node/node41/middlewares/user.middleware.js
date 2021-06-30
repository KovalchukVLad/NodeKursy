const { User } = require('../dataBase');
const { responceCodesEnum: { BAD_REQUEST, INVALID_DATA }, constants: { ID_LENGTH } } = require('../constants');
const { errorMessages: { RECORD_NOT_FOUND, WRONG_EMAIL, FIELD_IS_EMPTY }, ErrorHandler } = require('../errors');

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const { userId } = req.params;

            if (userId.length !== ID_LENGTH) {
                throw new ErrorHandler(BAD_REQUEST, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.code);
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

    checkIsDataCorrect: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new ErrorHandler(BAD_REQUEST, FIELD_IS_EMPTY.message, FIELD_IS_EMPTY.code);
            }

            const isEmailAvailable = await User.findOne({ email });

            if (isEmailAvailable) {
                throw new ErrorHandler(INVALID_DATA, WRONG_EMAIL.message, WRONG_EMAIL.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

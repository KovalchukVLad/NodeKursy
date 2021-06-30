const { User } = require('../dataBase');
const { responceCodesEnum: { BAD_REQUEST, INVALID_DATA } } = require('../constants');
const { errorMessages: { RECORD_NOT_FOUND, WRONG_EMAIL }, ErrorHandler } = require('../errors');

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const { userId } = req.params;

            if (userId.length !== 24) {
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
            if (req.body.email && req.body.password) {
                const isEmailAvailable = await User.findOne({ email: req.body.email });

                if (isEmailAvailable) {
                    throw new ErrorHandler(INVALID_DATA, WRONG_EMAIL.message, WRONG_EMAIL.code);
                }

                next();
            }
        } catch (e) {
            next(e);
        }
    }
};
// Дякую, усе виправив,
//     але є питання, коли я провіряю в мідварі юзера на його існування,

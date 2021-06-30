const { User } = require('../dataBase');
const { errorMessages, ErrorHandler } = require('../errors');

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userById = await User.findById(userId);

            if (!userById) {
                throw new ErrorHandler(400, errorMessages.RECORD_NOT_FOUND.message, errorMessages.RECORD_NOT_FOUND.code);
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
                const users = await User.find({});
                const isEmailAvailable = users.find((user) => user.email === req.body.email);

                if (isEmailAvailable) {
                    throw new ErrorHandler(409, errorMessages.WRONG_EMAIL.message, errorMessages.WRONG_EMAIL.code);
                }

                next();
            }
        } catch (e) {
            next(e);
        }
    }
};

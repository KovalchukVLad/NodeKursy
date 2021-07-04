const { User } = require('../dataBase');
const { passwordHasher } = require('../helpers');
const { responceCodesEnum: { INVALID_DATA, BAD_REQUEST } } = require('../constants');
const { errorMessages: { WRONG_EMAIL_OR_PASSWORD, ValidationError }, ErrorHandler } = require('../errors');
const { userAuthValidator } = require('../validators');

module.exports = {
    checkIsPasswordValid: async (req, res, next) => {
        try {
            const { password, email } = req.body;
            const userByEmail = await User.findOne({ email }).select('+password');

            if (!userByEmail) {
                throw new ErrorHandler(INVALID_DATA, WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code);
            }

            await passwordHasher.compare(userByEmail.password, password.toString());

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsAuthDataValid: (req, res, next) => {
        try {
            const { error } = userAuthValidator.authUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message, ValidationError.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

const {
    responseCodesEnum: { UNAUTHORIZED },
    tokenConstants: { EMAIL, PASSWORD, PASSWORD_TOKEN }
} = require('../constants');
const { EmailConfirm, PasswordConfirm } = require('../database');
const { ErrorHandler, errorMessages: { WRONG_TOKEN } } = require('../errors');
const { tokenService } = require('../services');

module.exports = {
    checkEmailToken: async (req, res, next) => {
        try {
            const { confirm } = req.query;

            if (!confirm) {
                throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            await tokenService.verifyToken(confirm, EMAIL);
            const { user } = await EmailConfirm.findOne({ emailToken: confirm });

            if (!user) {
                throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            await EmailConfirm.deleteOne({ emailToken: confirm });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPasswordToken: async (req, res, next) => {
        try {
            const confirm = req.get(PASSWORD_TOKEN);

            if (!confirm) {
                throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            await tokenService.verifyToken(confirm, PASSWORD);

            const token = await PasswordConfirm.findOne({ passwordToken: confirm });

            if (!token) {
                throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            await PasswordConfirm.deleteOne({ passwordToken: confirm });

            next();
        } catch (e) {
            next(e);
        }
    }
};

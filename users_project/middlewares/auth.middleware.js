const {
    responseCodesEnum: {
        BAD_REQUEST,
        INVALID_DATA,
        UNAUTHORIZED
    },
    tokenConstants: {
        ACCESS,
        ACCESS_TOKEN,
        AUTHORIZATION,
        REFRESH_TOKEN
    }
} = require('../constants');
const { User, Auth } = require('../database');
const {
    ErrorHandler,
    errorMessages: {
        ERROR_VALIDATION,
        WRONG_TOKEN,
        WRONG_EMAIL_OR_PASSWORD
    }
} = require('../errors');
const { passwordService, tokenService } = require('../services');
const { authValidator } = require('../validators');

module.exports = {
    checkAuthDataValid: (req, res, next) => {
        try {
            const { error } = authValidator.authUser.validate(req.body);

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

    checkIsPasswordValid: async (req, res, next) => {
        try {
            const { password, email } = req.body;

            const userByEmail = await User.findOne({ email }).select('+password');

            if (!userByEmail) {
                throw new ErrorHandler(
                    INVALID_DATA,
                    WRONG_EMAIL_OR_PASSWORD.message,
                    WRONG_EMAIL_OR_PASSWORD.code
                );
            }

            await passwordService.compare(userByEmail.password, password.toString());

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType = ACCESS) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            const type = tokenType === ACCESS ? ACCESS_TOKEN : REFRESH_TOKEN;

            if (!token) {
                throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            await tokenService.verifyToken(token, tokenType);

            const tokenObj = await Auth.findOne({ [type]: token });

            if (!tokenObj) {
                throw new ErrorHandler(UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            req.user = tokenObj.user;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    }
};

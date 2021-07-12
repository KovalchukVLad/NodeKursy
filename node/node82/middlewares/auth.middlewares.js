const {
    responceCodesEnum:
    {
        INVALID_DATA,
        BAD_REQUEST,
        UNAUTORIZED
    },
    constantsForTokens: {
        AUTHORIZATION,
        ACCESS_TOKEN,
        ACCESS,
        REFRESH_TOKEN
    },
    constants: { SECURITY_EMAIL_CODE }
} = require('../constants');
const { User, OAuth } = require('../dataBase');
const { errorMessages: { WRONG_EMAIL_OR_PASSWORD, ValidationError, WRONG_TOKEN }, ErrorHandler } = require('../errors');
const { authService, passwordService } = require('../services');
const { userAuthValidator } = require('../validators');

module.exports = {
    checkIsPasswordValid: async (req, res, next) => {
        try {
            const { password, email } = req.body;
            const userByEmail = await User.findOne({ email }).select('+password');

            if (!userByEmail) {
                throw new ErrorHandler(INVALID_DATA, WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code);
            }

            await passwordService.compare(userByEmail.password, password.toString());

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
    },

    checkToken: (tokenType = ACCESS) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            const type = tokenType === ACCESS ? ACCESS_TOKEN : REFRESH_TOKEN;

            if (!token) {
                throw new ErrorHandler(UNAUTORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            await authService.verifyToken(token, tokenType);

            const tokenObj = await OAuth.findOne({ [type]: token });

            if (!tokenObj) {
                throw new ErrorHandler(UNAUTORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
            }

            req.user = tokenObj.user;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    EmailValidation: (req, res, next) => {
        try {
            const securityCode = req.get(SECURITY_EMAIL_CODE);

            if (securityCode) {
                req.security = securityCode;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

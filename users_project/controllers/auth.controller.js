const {
    emailActionsEnum: { WELCOME },
    responseCodesEnum: { UNAUTHORIZED },
    responseMessages: { LOGOUT_SUCCESS }
} = require('../constants');
const { Auth } = require('../database');
const { mailService, tokenService, userService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { _id, email, name } = req.user;

            await Auth.remove({ user: _id });

            const tokenPair = tokenService.createTokenPair();
            await mailService.sendEmail(email, WELCOME, { name });

            await Auth.create({ ...tokenPair, user: _id });

            const normalizedUser = userService.userNormalizer(req.user.toJSON());

            res.json({
                ...tokenPair,
                user: normalizedUser
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { token } = req;

            await Auth.remove({ accessToken: token });

            res.status(UNAUTHORIZED).json(LOGOUT_SUCCESS);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { user: { _id }, token } = req;

            await Auth.remove({ refreshToken: token });
            const tokenPair = tokenService.createTokenPair();

            await Auth.create({ ...tokenPair, user: _id });

            const normalizedUser = userService.userNormalizer(req.user.toJSON());

            res.json({
                ...tokenPair,
                user: normalizedUser
            });
        } catch (e) {
            next(e);
        }
    }
};

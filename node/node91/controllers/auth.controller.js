const { emailActionsEnum: { WELCOME }, responceCodesEnum: { NO_CONTENT } } = require('../constants');
const { OAuth } = require('../dataBase');
const { authService, mailService, userService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user: { _id, email } } = req;

            await OAuth.remove({ user: _id });

            const tokenPair = authService.createTokenPair();
            await mailService.sendEmail(email, WELCOME, { userName: email });

            await OAuth.create({
                ...tokenPair,
                user: _id
            });

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
            await OAuth.remove({ accessToken: token });

            res.status(NO_CONTENT).json('Logout success');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { user: { _id } } = req;

            await OAuth.remove({ refreshToken: req.token });
            const tokenPair = authService.createTokenPair();

            await OAuth.create({
                ...tokenPair,
                user: _id
            });

            const normalizedUser = userService.userNormalizer(req.user);

            res.json({
                ...tokenPair,
                user: normalizedUser
            });
        } catch (e) {
            next(e);
        }
    },
};

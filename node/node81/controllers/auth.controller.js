const { emailActionsEnum: { WELCOME }, responceCodesEnum: { NO_CONTENT } } = require('../constants');
const { OAuth } = require('../dataBase');
const { authService, mailService } = require('../services');

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
            res.json({
                ...tokenPair,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            await OAuth.remove({ accessToken: req.token });

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
            res.json({
                ...tokenPair,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    },
};

const { constants: { AUTHORIZATION }, responceCodesEnum: { NO_CONTENT } } = require('../constants');
const { OAuth } = require('../dataBase');
const { authService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user: { _id } } = req;
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
    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await OAuth.remove({ accessToken: token });

            res.status(NO_CONTENT).json('Logout success');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { user: { _id } } = req;
            const token = req.get(AUTHORIZATION);

            await OAuth.remove({ refreshToken: token });
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

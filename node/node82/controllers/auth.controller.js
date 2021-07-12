const { emailActionsEnum: { WELCOME, Email_VALIDATOR }, responceCodesEnum: { NO_CONTENT } } = require('../constants');
const { OAuth, EmailValidator } = require('../dataBase');
const { authService, mailService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user: { _id, email }, security } = req;

            await OAuth.remove({ user: _id });

            if (security) {
                const securityCode = await EmailValidator.findOne({ securityCode: security });
                if (securityCode) {
                    await EmailValidator.remove({ _id });

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
                }
            } else {
                const seCode = 100;

                await Email_VALIDATOR.create({
                    _id,
                    securityCode: seCode
                });

                await mailService.sendEmail(email, Email_VALIDATOR, { userName: email, securityCode: seCode });

                res.json('Login one more time with Security code, which sent on your email');
            }
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
            res.json({
                ...tokenPair,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    },
};

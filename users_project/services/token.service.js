const jwt = require('jsonwebtoken');
const util = require('util');

const {
    tokenConstants: {
        ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_DURATION,
        ACCESS,
        REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_DURATION,
        EMAIL_CONFIRM_TOKEN_SECRET,
        EMAIL_TOKEN_DURATION,
        EMAIL,
        PASSWORD_CHANGE_CONFIRM_TOKEN_SECRET,
        PASSWORD_CHANGE_TOKEN_DURATION,
        PASSWORD
    }
} = require('../constants');

const verifyTokenPromisify = util.promisify(jwt.verify);

module.exports = {
    createTokenPair: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_DURATION });

        return {
            accessToken,
            refreshToken
        };
    },

    createEmailConfirmToken: () => jwt.sign({}, EMAIL_CONFIRM_TOKEN_SECRET, { expiresIn: EMAIL_TOKEN_DURATION }),

    createPasswordChangeConfirmToken: () => jwt.sign(
        {},
        PASSWORD_CHANGE_CONFIRM_TOKEN_SECRET,
        { expiresIn: PASSWORD_CHANGE_TOKEN_DURATION }
    ),

    verifyToken: async (token, tokenType) => {
        let secretWord;

        switch (tokenType) {
            case EMAIL:
                secretWord = EMAIL_CONFIRM_TOKEN_SECRET;
                break;
            case PASSWORD:
                secretWord = PASSWORD_CHANGE_CONFIRM_TOKEN_SECRET;
                break;
            case ACCESS:
                secretWord = ACCESS_TOKEN_SECRET;
                break;
            default:
                secretWord = REFRESH_TOKEN_SECRET;
        }

        await verifyTokenPromisify(token, secretWord);
    }
};

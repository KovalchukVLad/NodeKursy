const jwt = require('jsonwebtoken');
const util = require('util');

const {
    constants: { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET },
    constantsForTokens: { ACCESS, ACCESS_TOKEN_DURATION, REFRESH_TOKEN_DURATION }
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
    verifyToken: async (token, tokenType) => {
        const secretWord = tokenType === ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

        await verifyTokenPromisify(token, secretWord);
    }
};

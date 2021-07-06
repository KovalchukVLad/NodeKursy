const jwt = require('jsonwebtoken');
const util = require('util');

const { constants: { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } } = require('../constants');

const verifyTokenPromisify = util.promisify(jwt.verify);

module.exports = {
    createTokenPair: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        };
    },
    verifyToken: async (token, tokenType) => {
        const secretWord = tokenType === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

        await verifyTokenPromisify(token, secretWord);
    }
};

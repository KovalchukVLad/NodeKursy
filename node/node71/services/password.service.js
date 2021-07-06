const bcrypt = require('bcrypt');

const { responceCodesEnum: { INVALID_DATA } } = require('../constants');
const { errorMessages: { WRONG_EMAIL_OR_PASSWORD }, ErrorHandler } = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (hashedPassword, password) => {
        const compare = await bcrypt.compare(password, hashedPassword);

        if (!compare) {
            throw new ErrorHandler(INVALID_DATA, WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code);
        }
    }
};

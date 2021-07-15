const {
    errors: { UNKNOWN_ERROR },
    responseCodesEnum: { BAD_REQUEST }
} = require('../constants');
const { ErrorHandler, errorMessages: { WRONG_PATH } } = require('../errors');

module.exports = {
    pathNotFound: (req, res, next) => {
        next(new ErrorHandler(BAD_REQUEST, WRONG_PATH.message, WRONG_PATH.code));
    },

    // eslint-disable-next-line no-unused-vars
    errorHandler: (err, req, res, next) => {
        res
            .status(err.status || BAD_REQUEST)
            .json({
                message: err.message || UNKNOWN_ERROR,
                customCode: err.code || BAD_REQUEST
            });
    }
};

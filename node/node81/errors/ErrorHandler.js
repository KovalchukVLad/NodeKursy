class ErrorHandler extends Error {
    constructor(status, message, customCode) {
        super(message);
        this.status = status;
        this.message = message;
        this.code = customCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;

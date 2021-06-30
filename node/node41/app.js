const express = require('express');
const mongoose = require('mongoose');

const { constants, responceCodesEnum, errors } = require('./constants');
const { errorMessages: { WRONG_PATH }, ErrorHandler } = require('./errors');
const { userRouter } = require('./routes');

const app = express();

mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('*', pathNotFound);
app.use(_errorHandler);

app.listen(constants.PORT, () => {
    console.log(`App listen ${constants.PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err.message || errors.UNKNOWN_ERROR,
            customCode: err.code || responceCodesEnum.BAD_REQUEST
        });
}

function pathNotFound(req, res, next) {
    next(new ErrorHandler(404, WRONG_PATH.message, WRONG_PATH.code));
}

function mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/node41', { useNewUrlParser: true, useUnifiedTopology: true });
}

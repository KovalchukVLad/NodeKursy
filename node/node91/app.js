const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const { constants, responceCodesEnum, errors } = require('./constants');
const { errorMessages: { WRONG_PATH } } = require('./errors');
const { userRouter, authRouter } = require('./routes');

const app = express();

mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use(fileUpload({}));
app.use('/auth', authRouter);
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
function pathNotFound(err, req, res, next) {
    next({
        status: err.status || WRONG_PATH.code,
        message: err.message || WRONG_PATH.message
    });
}

function mongooseConnector() {
    mongoose.connect(constants.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

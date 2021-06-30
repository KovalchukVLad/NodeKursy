const express = require('express');
const mongoose = require('mongoose');

const { carRouter } = require('./routes');
const { constants } = require('./constants');

const app = express();

mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRouter);
app.use('*', ((err, req, res, next) => {
    next({
        status: err.status || 404,
        message: err.message || 'Route not found'
    });
}));
app.use(_errorHandler);

app.listen(constants.PORT, () => {
    console.log(`App listen ${constants.PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err.message || 'Unknown error',
            customCode: err.code || 0
        });
}

function mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/node42', { useNewUrlParser: true, useUnifiedTopology: true });
}

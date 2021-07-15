const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const { constants } = require('./constants');
const { appHelper } = require('./helpers');
const { userRouter, authRouter } = require('./routes');

const app = express();

mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/ping', (req, res) => {
    res.end('pong');
});
app.use(fileUpload({}));
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('*', appHelper.pathNotFound);
app.use(appHelper.errorHandler);

app.listen(constants.PORT, () => {
    console.log(`App listen ${constants.PORT}`);
});

function mongooseConnector() {
    mongoose.connect(constants.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

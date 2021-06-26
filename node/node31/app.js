const express = require('express');

const { userRouter } = require('./routes');
const { constants } = require('./constants');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(constants.PORT, () => {
    console.log(`App listen ${constants.PORT}`);
});

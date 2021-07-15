const { Schema, model } = require('mongoose');

const { databaseTablesEnum } = require('../constants');

const passwordTokenSchema = new Schema({
    passwordToken: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model(databaseTablesEnum.PASSWORD_CONFIRM, passwordTokenSchema);

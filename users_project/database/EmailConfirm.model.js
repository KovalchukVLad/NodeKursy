const { Schema, model } = require('mongoose');

const { databaseTablesEnum } = require('../constants');

const emailTokenSchema = new Schema({
    emailToken: {
        type: String,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
}, { timestamps: true });

module.exports = model(databaseTablesEnum.EMAIL_CONFIRM, emailTokenSchema);

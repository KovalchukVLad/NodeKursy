const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants');

const EmailValidatorSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    securityCode: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.Email_Validator, EmailValidatorSchema);

const Joi = require('joi');

const { regexp } = require('../constants');
const validatorKeys = require('./Keys.validators');

module.exports = {
    createUser: Joi.object().keys({
        email: Joi.string().regex(regexp.EMAIL_REGEXP),
        password: Joi.string().regex(regexp.PASSWORD_REGEXP),
        name: validatorKeys.name.required(),
        age: validatorKeys.age,
        role: validatorKeys.role
    }),

    updateUser: Joi.object().keys({
        name: validatorKeys.name,
        age: validatorKeys.age,
        role: validatorKeys.role
    })
};

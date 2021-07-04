const Joi = require('joi');

const validatorKeys = require('./Keys.validators');

module.exports = {
    createUser: Joi.object().keys({
        email: validatorKeys.email,
        password: validatorKeys.password,
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

const Joi = require('joi');

const validatorKeys = require('./Keys.validators');

module.exports = {
    authUser: Joi.object().keys({
        email: validatorKeys.email,
        password: validatorKeys.password
    })
};

const Joi = require('joi');

const { keysUserValidator } = require('./Keys.validators');

module.exports = {
    createUser: Joi.object().keys({
        email: keysUserValidator.email,
        password: keysUserValidator.password,
        name: keysUserValidator.name.required(),
        age: keysUserValidator.age,
        role: keysUserValidator.role
    }),

    updateUser: Joi.object().keys({
        name: keysUserValidator.name,
        age: keysUserValidator.age,
        role: keysUserValidator.role
    })
};

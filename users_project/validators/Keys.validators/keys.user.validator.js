const Joi = require('joi');

const { regexp, userRoles } = require('../../constants');

module.exports = {
    email: Joi.string().max(256).regex(regexp.EMAIL_REGEXP),
    password: Joi.string().max(256).regex(regexp.PASSWORD_REGEXP),
    name: Joi.string().min(3).max(50),
    age: Joi.number().min(1).max(120),
    role: Joi.string().allow(...Object.values(userRoles))
};

const Joi = require('joi');

const { userRolesEnum } = require('../../constants');
const { regexp } = require('../../constants');

module.exports = {
    email: Joi.string().regex(regexp.EMAIL_REGEXP),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP),
    name: Joi.string().min(3).max(50),
    age: Joi.number().min(1).max(120),
    role: Joi.string().allow(...Object.values(userRolesEnum))
};

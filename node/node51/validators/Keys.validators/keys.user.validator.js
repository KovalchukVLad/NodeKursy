const Joi = require('joi');
const { userRolesEnum } = require('../../constants');

module.exports = {
    name: Joi.string().min(3).max(50),
    age: Joi.number().min(1).max(120),
    role: Joi.string().allow(...Object.values(userRolesEnum))
};

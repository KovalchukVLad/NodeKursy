const Joi = require('joi');

module.exports = {
    authUser: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
};

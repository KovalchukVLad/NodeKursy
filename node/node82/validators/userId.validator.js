const Joi = require('joi');

module.exports = {
    userId: Joi.string().min(24).max(24).required()
};

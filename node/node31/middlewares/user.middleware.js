const { userService } = require('../services');
const { errors } = require('../constants');

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        const userById = await userService.findUserById(req.params);

        if (!userById) {
            throw new Error(errors.User_Not_Exists);
        }
        req.user = userById;

        next();
    },

    checkIsEmailCorrect: async (req, res, next) => {
        const users = await userService.findAll();
        const isEmailAvailable = users.find((user) => user.email === req.body.email);

        if (isEmailAvailable) {
            throw new Error(errors.Email_Not_Available);
        }

        next();
    }
};

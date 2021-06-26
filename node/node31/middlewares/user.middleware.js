const { userService } = require('../services');

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        const userById = await userService.findUserById(req.params);
        if (!userById) {
            throw new Error('user not exists');
        }
        req.user = userById;

        next();
    },
    checkIsEmailCorrect: async (req, res, next) => {
        const users = await userService.findAll();
        const isEmailAvailable = users.find((user) => user.email === req.body.email);
        if (isEmailAvailable) {
            throw new Error('email not available');
        }
        req.user = isEmailAvailable;

        next();
    }
};

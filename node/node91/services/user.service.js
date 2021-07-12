const { User } = require('../dataBase');
const { passwordService } = require('.');

module.exports = {
    createUser: async (user) => {
        const { password } = user;

        const hashedPassword = await passwordService.hash(password);

        const createUser = await User.create({ ...user, password: hashedPassword });
        return createUser;
    },

    userNormalizer: (user = {}) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            delete user[field];
        });

        return user;
    }
};

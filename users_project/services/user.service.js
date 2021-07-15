const { User } = require('../database');
const { hash } = require('./password.service');

module.exports = {
    createUser: async (user) => {
        const { password } = user;

        const hashedPassword = await hash(password.toString());
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

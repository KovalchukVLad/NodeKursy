const { User } = require('../dataBase');
const { passwordService } = require('.');

module.exports = {
    createUser: async (user) => {
        const { password } = user;

        const hashedPassword = await passwordService.hash(password);

        await User.create({ ...user, password: hashedPassword });
    }
};

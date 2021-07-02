const { passwordHasher } = require('../helpers');
const { User } = require('../dataBase');

module.exports = {
    createUser: async (user) => {
        const { password } = user;

        const hashedPassword = await passwordHasher.hash(password);
        await User.create({ ...user, password: hashedPassword });
    }
};

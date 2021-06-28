const fs = require('fs/promises');

const { constants } = require('../constants');

module.exports = {
    findAll: async () => {
        const data = await fs.readFile(constants.filePath, 'utf8');

        return JSON.parse(data);
    },

    findUserById: async ({ userId }) => {
        const data = await fs.readFile(constants.filePath, 'utf8');
        const users = JSON.parse(data);
        const user = users.find((user1) => (user1.id.toString() === userId));

        return user;
    },

    insertUser: async (userObject) => {
        const data = await fs.readFile(constants.filePath, 'utf8');
        const users = JSON.parse(data);

        users.push({ id: users.length + 1, ...userObject });
        await fs.writeFile(constants.filePath, JSON.stringify(users));
    },

    deleteUserById: async ({ userId }) => {
        const data = await fs.readFile(constants.filePath, 'utf8');
        const users = JSON.parse(data);
        const newUsers = users.filter((user) => user.id.toString() !== userId);

        await fs.writeFile(constants.filePath, JSON.stringify(newUsers));
    },

    updateUser: async ({ userId }, newInfo) => {
        const data = await fs.readFile(constants.filePath, 'utf8');
        const users = JSON.parse(data);
        const indexOfUser = users.findIndex((user1) => user1.id.toString() === userId);

        // users[indexOfUser] = { id: userId, ...newInfo }; // bad
        users[indexOfUser] = { ...users[indexOfUser], ...newInfo }; // good
        await fs.writeFile(constants.filePath, JSON.stringify(users));
    }
};

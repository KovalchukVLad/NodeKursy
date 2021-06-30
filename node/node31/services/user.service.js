const fs = require('fs');
const util = require('util');

const { constants } = require('../constants');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

module.exports = {
    findAll: async () => {
        const users = await getUsers();
        return users;
    },

    findUserById: async ({ userId }) => {
        const users = await getUsers();
        const user = users.find((user1) => (user1.id.toString() === userId));

        return user;
    },

    insertUser: async (userObject) => {
        const users = await getUsers();

        users.push({ id: users.length + 1, ...userObject });
        await writeUser(users);
    },

    deleteUserById: async ({ userId }) => {
        const users = await getUsers();
        const newUsers = users.filter((user) => user.id.toString() !== userId);

        await writeUser(newUsers);
    },

    updateUser: async ({ userId }, newInfo) => {
        const users = await getUsers();
        const indexOfUser = users.findIndex((user1) => user1.id.toString() === userId);

        // users[indexOfUser] = { id: userId, ...newInfo }; // bad
        users[indexOfUser] = { ...users[indexOfUser], ...newInfo }; // good
        await writeUser(users);
    }
};

async function getUsers() {
    const data = await readFilePromise(constants.filePath);
    return JSON.parse(data.toString());
}

async function writeUser(users) {
    await writeFilePromise(constants.filePath, JSON.stringify(users));
}

// module.exports = {
//     findAll: async () => {
//         const data = await fs.readFile(constants.filePath, 'utf8');
//
//         return JSON.parse(data);
//     },
//
//     findUserById: async ({userId}) => {
//         const data = await fs.readFile(constants.filePath, 'utf8');
//         const users = JSON.parse(data);
//         const user = users.find((user1) => (user1.id.toString() === userId));
//
//         return user;
//     },
//
//     insertUser: async (userObject) => {
//         const data = await fs.readFile(constants.filePath, 'utf8');
//         const users = JSON.parse(data);
//
//         users.push({id: users.length + 1, ...userObject});
//         await fs.writeFile(constants.filePath, JSON.stringify(users));
//     },
//
//     deleteUserById: async ({userId}) => {
//         const data = await fs.readFile(constants.filePath, 'utf8');
//         const users = JSON.parse(data);
//         const newUsers = users.filter((user) => user.id.toString() !== userId);
//
//         await fs.writeFile(constants.filePath, JSON.stringify(newUsers));
//     },
//
//     updateUser: async ({userId}, newInfo) => {
//         const data = await fs.readFile(constants.filePath, 'utf8');
//         const users = JSON.parse(data);
//         const indexOfUser = users.findIndex((user1) => user1.id.toString() === userId);
//
//         // users[indexOfUser] = { id: userId, ...newInfo }; // bad
//         users[indexOfUser] = {...users[indexOfUser], ...newInfo}; // good
//         await fs.writeFile(constants.filePath, JSON.stringify(users));
//     }
// };

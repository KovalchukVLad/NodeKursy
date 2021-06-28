const { userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.findAll();

        res.json(users);
    },

    getUserById: (req, res) => {
        res.json(req.user);
    },

    createUser: async (req, res) => {
        await userService.insertUser(req.body);

        res.json('success create');
    },

    deleteUser: async (req, res) => {
        await userService.deleteUserById(req.params);

        res.json('success delete');
    },

    updateUser: async (req, res) => {
        await userService.updateUser(req.params, req.body);

        res.json('success update');
    }
};

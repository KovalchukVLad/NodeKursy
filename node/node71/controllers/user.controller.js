const { responceCodesEnum, constants: { AUTHORIZATION } } = require('../constants');
const { User, OAuth } = require('../dataBase');
const { userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            await userService.createUser(req.body);

            res.status(responceCodesEnum.CREATED).json('user successfully created');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            const { user: { _id } } = req;

            await OAuth.remove({ accessToken: token });
            await User.deleteOne({ _id });

            res.status(responceCodesEnum.NO_CONTENT).json('success delete');
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res) => {
        const { user: { _id } } = req;

        await User.updateOne({ _id }, req.body);

        res.status(responceCodesEnum.CREATED).json('success update');
    }
};

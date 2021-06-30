const { User } = require('../dataBase');
const { responceCodesEnum } = require('../constants');

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
            await User.create(req.body);

            res.status(responceCodesEnum.CREATED).json('user successfully created');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await User.deleteOne({ _id: userId });

            res.status(responceCodesEnum.NO_CONTENT).json('success delete');
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res) => {
        const { userId } = req.params;

        await User.updateOne({ _id: userId }, { ...req.body });

        res.json('success update');
    }
};

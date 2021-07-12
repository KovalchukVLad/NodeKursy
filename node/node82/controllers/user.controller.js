const { responceCodesEnum, emailActionsEnum: { CREATE, DELETE, UPDATE } } = require('../constants');
const { User, OAuth } = require('../dataBase');
const { userService, mailService } = require('../services');

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
            const { name, email } = req.body;

            await userService.createUser(req.body);
            await mailService.sendEmail(email, CREATE, { userName: name });

            res.status(responceCodesEnum.CREATED).json('user successfully created');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { token, user: { _id, email } } = req;

            await OAuth.remove({ accessToken: token });
            await User.deleteOne({ _id });
            await mailService.sendEmail(email, DELETE, { userEmail: email });

            res.status(responceCodesEnum.NO_CONTENT).json('success delete');
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res) => {
        const { user: { _id } } = req;

        await User.updateOne({ _id }, req.body);

        const newUser = await User.findOne({ _id });
        await mailService.sendEmail(newUser.email, UPDATE, { userName: newUser.name, newData: JSON.stringify(req.body) });

        res.status(responceCodesEnum.CREATED).json('success update');
    }
};

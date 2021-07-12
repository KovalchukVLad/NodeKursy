const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const {
    responceCodesEnum,
    emailActionsEnum: { CREATE, DELETE, UPDATE },
    dirAndFilesNames: {
        AVATAR_DIR,
        PHOTOS_DIR,
        STATIC_DIR,
        USERS_DIR
    }
} = require('../constants');
const { User, OAuth } = require('../dataBase');
const { fileDirBuilder } = require('../helpers');
const { userService, mailService } = require('../services');

const promiseRmDir = promisify(fs.rmdir);

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
            const { photos, avatar } = req;

            const { _id } = await userService.createUser(req.body);
            await mailService.sendEmail(email, CREATE, { userName: name });

            if (photos.length) {
                const ava = await fileDirBuilder(avatar.name, _id, USERS_DIR, AVATAR_DIR);

                await avatar.mv(ava.finalPath);
                await User.updateOne({ _id }, { avatar: ava.photoPath });

                const photo = await fileDirBuilder(avatar.name, _id, USERS_DIR, PHOTOS_DIR);

                await avatar.mv(photo.finalPath);
                await User.updateOne({ _id }, { gallery: [photo.photoPath] });
            }

            res.status(responceCodesEnum.CREATED).json('user successfully created');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { token, user: { _id, email } } = req;

            const userDirPath = path.join(process.cwd(), STATIC_DIR, USERS_DIR, _id.toString());
            await promiseRmDir(userDirPath, { recursive: true });

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
    },

    changeAvatar: async (req, res, next) => {
        try {
            const { photos, avatar, user: { _id } } = req;

            if (photos.length) {
                const avatarDirPath = path.join(process.cwd(), STATIC_DIR, USERS_DIR, _id.toString(), AVATAR_DIR);
                await promiseRmDir(avatarDirPath, { recursive: true });

                const ava = await fileDirBuilder(avatar.name, _id, USERS_DIR, AVATAR_DIR);

                await avatar.mv(ava.finalPath);
                await User.updateOne({ _id }, { avatar: ava.photoPath });

                const photo = await fileDirBuilder(avatar.name, _id, USERS_DIR, PHOTOS_DIR);

                await avatar.mv(photo.finalPath);

                const { gallery } = await User.findOne({ _id });

                await User.updateOne({ _id }, {
                    gallery: [
                        ...gallery,
                        photo.photoPath
                    ]
                });
            }

            res.json('avatar changed');
        } catch (e) {
            next(e);
        }
    },

    addToGallery: async (req, res, next) => {
        try {
            const { photos, user: { _id } } = req;

            const photosUrlArr = [];

            if (photos.length) {
                for (const photo of photos) {
                    // eslint-disable-next-line no-await-in-loop
                    const { finalPath, photoPath } = await fileDirBuilder(photo.name, _id, USERS_DIR, PHOTOS_DIR);

                    // eslint-disable-next-line no-await-in-loop
                    await photo.mv(finalPath);

                    photosUrlArr.push(photoPath);
                }

                await User.updateOne({ _id }, { $push: { gallery: photosUrlArr } });
            }

            res.json('photo successfully added to gallery');
        } catch (e) {
            next(e);
        }
    },
};

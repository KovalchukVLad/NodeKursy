const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const {
    constants: { LOCALHOST_URL },
    dirAndFilesNames: {
        AVATAR_DIR,
        PHOTOS_DIR,
        STATIC_DIR,
        USERS_DIR
    },
    responseCodesEnum: { CREATED },
    responseMessages: { AVATAR_UPDATED }
} = require('../constants');
const { User } = require('../database');
const { fileDirBuilderHelper } = require('../helpers');

const promiseRmDir = promisify(fs.rmdir);

module.exports = {
    setAvatar: async (req, res, next) => {
        try {
            const { avatar, user: { _id } } = req;

            const avatarDirPath = path.join(process.cwd(), STATIC_DIR, USERS_DIR, _id.toString(), AVATAR_DIR);
            await promiseRmDir(avatarDirPath, { recursive: true });

            const ava = await fileDirBuilderHelper(avatar.name, _id, USERS_DIR, AVATAR_DIR);
            await avatar.mv(ava.finalPath);
            await User.updateOne({ _id }, { avatar: ava.photoPath });

            const photo = await fileDirBuilderHelper(avatar.name, _id, USERS_DIR, PHOTOS_DIR);
            await avatar.mv(photo.finalPath);
            await User.updateOne({ _id }, { $push: { gallery: photo.photoPath } });

            const photoPath = path.join(LOCALHOST_URL, ava.photoPath);

            res.status(CREATED).json({ message: AVATAR_UPDATED, photoPath });
        } catch (e) {
            next(e);
        }
    },

    addToGallery: async (req, res, next) => {
        try {
            const { photos, user: { _id, gallery } } = req;

            const photosUrlArr = [];

            if (photos.length) {
                for (const photo of photos) {
                    // eslint-disable-next-line no-await-in-loop
                    const { finalPath, photoPath } = await fileDirBuilderHelper(photo.name, _id, USERS_DIR, PHOTOS_DIR);

                    // eslint-disable-next-line no-await-in-loop
                    await photo.mv(finalPath);

                    photosUrlArr.push(photoPath);
                }

                await User.updateOne({ _id }, { $push: { gallery: photosUrlArr } });
            }

            res.status(CREATED).json(gallery.concat(photosUrlArr));
        } catch (e) {
            next(e);
        }
    },

    getGallery: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { gallery } = await User.findById(userId);

            res.json(gallery);
        } catch (e) {
            next(e);
        }
    },

    getAvatar: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { avatar } = await User.findById(userId);

            res.json(avatar);
        } catch (e) {
            next(e);
        }
    }
};

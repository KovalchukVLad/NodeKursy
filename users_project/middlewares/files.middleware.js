const { mimetypes, responseCodesEnum: { INVALID_DATA } } = require('../constants');
const {
    ErrorHandler,
    errorMessages: {
        FILE_SIZE_ERROR,
        WRONG_FILE_FORMAT,
        WRONG_FILES_COUNT
    }
} = require('../errors');

module.exports = {
    checkFiles: (req, res, next) => {
        try {
            let files = Object.values(req.files);

            if (Array.isArray(files[0])) {
                [files] = files;
            }

            const photos = [];

            for (let i = 0; i < files.length; i++) {
                const { size, mimetype } = files[i];

                if (mimetypes.PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > mimetypes.PHOTO_MAX_SIZE) {
                        throw new ErrorHandler(INVALID_DATA, FILE_SIZE_ERROR.message, FILE_SIZE_ERROR.code);
                    }

                    photos.push(files[i]);
                } else {
                    throw new ErrorHandler(INVALID_DATA, WRONG_FILE_FORMAT.message, WRONG_FILE_FORMAT.code);
                }
            }

            req.photos = photos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (req.photos.length > 1) {
                throw new ErrorHandler(INVALID_DATA, WRONG_FILES_COUNT.message, WRONG_FILES_COUNT.code);
            }
            [req.avatar] = req.photos;
            next();
        } catch (e) {
            next(e);
        }
    }
};

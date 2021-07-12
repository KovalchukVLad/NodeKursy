const { mimetypes, responceCodesEnum: { INVALID_DATA } } = require('../constants');
const { ErrorHandler, errorMessages: { WRONG_FILE_FORMAT, FILE_SIZE_ERROR, WRONG_FILES_COUNT } } = require('../errors');

module.exports = {
    checkFiles: (req, res, next) => {
        try {
            const files = Object.values(req.files);

            const photos = [];
            const videos = [];
            const documents = [];

            for (let i = 0; i < files.length; i++) {
                const { size, mimetype } = files[i];

                if (mimetypes.PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > mimetypes.PHOTO_MAX_SIZE) {
                        throw new ErrorHandler(INVALID_DATA, FILE_SIZE_ERROR.message, FILE_SIZE_ERROR.code);
                    }

                    photos.push(files[i]);
                } else if (mimetypes.VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (size > mimetypes.VIDEO_MAX_SIZE) {
                        throw new ErrorHandler(INVALID_DATA, FILE_SIZE_ERROR.message, FILE_SIZE_ERROR.code);
                    }

                    videos.push(files[i]);
                } else if (mimetypes.FILES_MIMETYPES.includes(mimetype)) {
                    if (size > mimetypes.FILE_MAX_SIZE) {
                        throw new ErrorHandler(INVALID_DATA, FILE_SIZE_ERROR.message, FILE_SIZE_ERROR.code);
                    }

                    documents.push(files[i]);
                } else {
                    throw new ErrorHandler(INVALID_DATA, WRONG_FILE_FORMAT.message, WRONG_FILE_FORMAT.code);
                }
            }
            req.photos = photos;
            req.videos = videos;
            req.documents = documents;
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

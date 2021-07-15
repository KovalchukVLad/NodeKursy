module.exports = {
    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    VIDEO_MAX_SIZE: 30 * 1024 * 1024,
    FILE_MAX_SIZE: 10 * 1024 * 1024,

    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp',
        'image/svg+xml'
    ],

    FILES_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOC 2007
        'application/vnd.ms-powerpoint',
        'application/vnd.ms-excel'
    ],

    VIDEOS_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ]
};

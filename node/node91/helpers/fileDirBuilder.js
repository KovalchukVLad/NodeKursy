const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v1;
const { promisify } = require('util');

const { dirAndFilesNames: { STATIC_DIR } } = require('../constants');

const promiseMkDir = promisify(fs.mkdir);

module.exports = async function fileDirBuilder(fileName, itemId, itemType, dirType) {
    const pathWithoutStatic = path.join(itemType, itemId.toString(), dirType);
    const uploadDir = path.join(process.cwd(), STATIC_DIR, pathWithoutStatic);

    const fileFormat = fileName.split('.').pop();
    const photoName = `${uuid()}.${fileFormat}`;
    const finalPath = path.join(uploadDir, photoName);

    await promiseMkDir(uploadDir, { recursive: true });
    return {
        finalPath,
        photoPath: path.join(pathWithoutStatic, photoName)
    };
};

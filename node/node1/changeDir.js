const fs = require('fs');
const path = require('path');

function changeDir(oldPathFile, newPathFile) {
    fs.readdir(oldPathFile, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.forEach(value => {
            fs.rename(path.join(oldPathFile, value), path.join(newPathFile, value), err1 => {
                if (err1) {
                    console.log(err1);
                }
            })
        })
    })
}

module.exports = changeDir;
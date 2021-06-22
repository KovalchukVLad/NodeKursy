const filePathGirls = __dirname + '/Girls';
const filePathBoys = __dirname + '/Boys';
const fs = require('fs');
const path = require('path');

function genderCheck(groupPath) {
    fs.readdir(groupPath, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.forEach(value => {
            fs.readFile(path.join(groupPath, value), (err1, data) => {
                if (err1) {
                    console.log(err1);
                    return
                }
                let a = JSON.parse(data.toString());
                if (a.gender === 'female') {
                    fs.rename(path.join(groupPath, value), path.join(filePathGirls, value), (err2) => {
                        if (err2) {
                            console.log(err2);
                        }
                    })
                    return;
                }
                fs.rename(path.join(groupPath, value), path.join(filePathBoys, value), (err3) => {
                    if (err3) {
                        console.log(err3);
                    }
                })
            })
        })
    })
}

module.exports = genderCheck;
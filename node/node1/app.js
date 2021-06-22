const genderCheck = require('./genderCheck');
const changeDir = require('./changeDir');
const fs = require('fs');
const path = require('path');


const filePath1 = __dirname + '/Group18-00';
const filePath2 = __dirname + '/Group20-00';
const filePathGirls = __dirname + '/Girls';
const filePathBoys = __dirname + '/Boys';

////////////////////////////////////////
function dirCreator(pathFile) {
    fs.mkdir(pathFile, {recursive: true}, err => {
        if (err) {
            console.log(err);
        }
    })
}

// dirCreator(filePath1);
// dirCreator(filePath2);
// dirCreator(filePathBoys);
// dirCreator(filePathGirls);
////////////////////////////////////////

const Karina = {
    name: 'Karina',
    gender: 'female'
};
const Oleg = {
    name: 'Oleg',
    gender: 'male'
};
const Max = {
    name: 'Max',
    gender: 'male'
};

const Vika = {
    name: 'Vika',
    gender: 'female'
};
const Ivan = {
    name: 'Ivan',
    gender: 'male'
};
const Nastia = {
    name: 'Nastia',
    gender: 'female'
};

function dataPush(pathFile, value) {
    fs.writeFile(path.join(pathFile, value.name + '.json'), JSON.stringify(value), err => {
        if (err) {
            console.log(err);
        }
    })
}

// dataPush(filePath1, Karina);
// dataPush(filePath1, Oleg);
// dataPush(filePath1, Max);
// dataPush(filePath2, Vika);
// dataPush(filePath2, Ivan);
// dataPush(filePath2, Nastia);
////////////////////////////////////////


////////////changeDir/////////////
changeDir(filePath1, filePath2);
// changeDir(filePath2, filePath1);

////////////////////////////////////////

////////////genderCheck/////////////
genderCheck(filePath1);
genderCheck(filePath2);


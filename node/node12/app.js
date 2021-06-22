let users = [
    {name: 'Olya', gender: 'female', age: 25},
    {name: 'Nastia', gender: 'female', age: 15},
    {name: 'Vika', gender: 'female', age: 42},
    {name: 'Yulia', gender: 'female', age: 54},
    {name: 'Katia', gender: 'female', age: 11},
    {name: 'Sergiy', gender: 'male', age: 19},
    {name: 'Max', gender: 'male', age: 74},
    {name: 'Oleg', gender: 'male', age: 8},
    {name: 'Petro', gender: 'male', age: 15},
    {name: 'Vasia', gender: 'male', age: 27},
];


const fs = require('fs');
let filePath = __dirname;
console.log(filePath);

// fs.mkdir(__dirname + '/womanOlder20',err => {
//     console.log(err);
// })
function setter (path, user){
    fs.writeFile(path+'/'+user.name+'.txt', JSON.stringify(user), err => {
        if (err){
            console.log(err);
        }
    })
    filePath = __dirname;
}

users.forEach(value => {
    if (value.gender === 'female') {
        if (value.age >= 20) {
            filePath = __dirname + '/womanOlder20'
        } else if (value.age < 20) {
            filePath = __dirname + '/womanYounger20'
        }
    }
    if (value.gender === 'male') {
        if (value.age >= 20) {
            filePath = __dirname + '/manOlder20'
        } else if (value.age < 20) {
            filePath = __dirname + '/manYounger20'
        }
    }



    if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, err => {
            if(err){
                console.log(err);
            }
        })
    }
    setter(filePath, value);
    // fs.(filePath, err => {
    //     if (!err) {
    //         fs.mkdir(filePath, err => {
    //             console.log('tt');
    //             if (err) {
    //                 // console.log(err);
    //             }
    //         })
    //     }
    // })



})
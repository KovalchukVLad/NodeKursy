const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const filePath =path.join(__dirname, 'users.json');
// const fs1 = require('fs');

// app.get('/users', (req, res) => {
//     fs1.readFile(path.join(__dirname, 'users.json'),(err, data) => {
//         if (err) {
//             console.log(err);
//             return
//         }
//         const a = JSON.stringify(data.toString());
//         res.json(a);
//     })
// })

app.get('/users', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    res.json(data);
})

app.get('/users/:index', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    const newUsers = JSON.parse(data);
    const {index} = req.params;
    res.json(newUsers[index]);
})

app.post('/users', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    let newUsers = JSON.parse(data);
    newUsers.push(req.body);
    await fs.writeFile(filePath, JSON.stringify(newUsers));
    res.end();
})


app.delete('/users/:index', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    const newUsers = JSON.parse(data);
    const {index} = req.params;
    newUsers.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(newUsers));
    res.end();
})

app.patch('/users/:index', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    const newUsers = JSON.parse(data);
    const {index} = req.params;

    newUsers.splice(index, 1);
    newUsers.push(req.body);
    await fs.writeFile(filePath, JSON.stringify(newUsers));

    res.end();
})

app.patch('/userss/:index', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    const newUsers = JSON.parse(data);

    const {index} = req.params;
    newUsers[index] = req.body;
    await fs.writeFile(filePath, JSON.stringify(newUsers));

    res.end();
})


app.listen(3000, () => {
    console.log('app listen port: 3000');
})









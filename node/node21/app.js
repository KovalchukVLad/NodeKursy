const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine( '.hbs', expressHbs({
    defaultLayout: false
}));

app.set('views', path.join(__dirname, 'static'));





app.get('/users', (req, res) => {
    res.render('users', {users});
})

app.get('/login', (req, res) => {
    res.render('login', {Adult: true});
})

app.post('/login', (req, res) => {
    console.log(req.body);
    res.json('ok');
})







app.listen(3000,() => {
    console.log('app listen 3000');
})

// app.get('/', (req, res) => {
//     // res.end('vlad');
//     res.json('vlad');
// })
//
// app.post('/', (req, res) => {
//     console.log(req.body);
//     console.log(req.query);
//     res.json('post_method');
// })
// //ne good
// // app.post('/honda', (req, res) => {
// //     res.json('honda')
// // })
//
// //good
// app.get('/users', (req, res) => {
//     res.json(users);
// })
// app.get('/users/:userId', (req, res) => {
//     const {userId} = req.params;
//     res.json(users[userId]);
// })
//

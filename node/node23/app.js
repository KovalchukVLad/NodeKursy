const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs/promises');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, 'static');
const filePath = path.join(__dirname, 'users.json');

app.use(express.static(staticPath));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

app.set('views', staticPath);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/sign', (req, res) => {
    res.render('sign');
});

app.post('/login', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(data);
    const { email, password } = req.body;

    const check = users.find((user) => (user.email === email && user.password === password));
    if (check) {
        res.redirect(`/users/${check.id}`);
        return;
    }
    res.render('error', { reason: 'Incorrect Data' });
});

app.post('/sign', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(data);
    const { email } = req.body;

    const check = users.find((user) => (user.email === email));
    if (check) {
        res.render('error', { reason: 'Email already exists' });
        return;
    }
    users.push({ id: users.length + 1, ...req.body });
    await fs.writeFile(filePath, JSON.stringify(users));
    res.redirect('/');
});

app.post('/users', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(data);
    const { userId } = req.body;
    res.render('users', { users, userId });
});

app.get('/users/:userId', async (req, res) => {
    const data = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(data);
    const { userId } = req.params;
    const user = users.find((user1) => (user1.id.toString() === userId.toString()));
    res.render('user', { user });
});

app.get('/error', (req, res) => {
    res.render('error', { reason: 'You must login or sign in' });
});

app.listen(3000, () => {
    console.log('app listen 3000');
});

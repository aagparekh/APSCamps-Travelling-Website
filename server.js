const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs')
const app = express();
const port = 3000;
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const jwtSecret = "sfedjfsdjhkdsfhkjdfmdshjffbesgkwQ@#@#@$#$%#$%$^#bhdfhjdfhjbf"
mongoose.connect('mongodb://localhost:27017/apscampdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.set('views', path.join(__dirname, "./views"));
app.use(express.static("static"));
app.use(bodyParser.json())


app.post('/api/login', async (req, res) => {
    const { user2, pass2 } = req.body
    const user = await User.findOne({ user1: user2 }).lean()
    if (!user) {
        return res.json({ status: 'error', error: "Invalid username/password" })
    }
    if (await bycrypt.compare(pass2, user.pass1)) {
        const token = jwt.sign(
            {
                id: user._id,
                username: user.user1,
                email: user.email,
                phone: user.phoneno
            }, jwtSecret
        )
        return res.json({ status: 'ok', data: token })
    }
    res.json({ status: 'error', error: "Invalid username/password" })
});

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    res.json({ status: 'ok' })
    const { user1, email, pass1: password, phoneno } = req.body
    const pass1 = await bycrypt.hash(password, 6)
    try {
        const response = await User.create({
            user1, email, pass1, phoneno
        })
        console.log('User created: ', response)
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error' })
    }
})

app.post('api/Trip', async (req, res) => {
    const { user, place, price, category } = req.body
    console.log(req.body);
    try {
        const response = await Trip.create({
            user, place, date, price, category
        })
        console.log('Trip created: ', response)
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error' })
    }
})


app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'))
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'))
});

app.get('/top-picks', (req, res) => {
    res.sendFile(path.join(__dirname, './views/top-picks.html'))
});

app.get('/trips', (req, res) => {
    res.sendFile(path.join(__dirname, './views/trips.html'))
});

app.get('/myaccount', (req, res) => {
    res.sendFile(path.join(__dirname, './views/sample.html'))
});

app.listen(port, () => {
    console.log("Server in port 3000");
});
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors")
const knex = require('knex')

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile")
const image = require("./controllers/image")

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'reika0529',
        database: 'smart-brain'
    }
});

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {})
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImageRequest(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

// app.delete('/delete', (req, res) => {
//     const {id} = req.body;
//     db('users').where('id', '=', id)
//         .then(user => {
//             if (user.length) {
//                 res.json(user[0])
//             } else {
//                 res.status(400).json("no such user")
//             }
//         })
//         .catch(err => res.status(400).json('unable to delete'))
// })

const PORT = process.env.PORT;

app.listen(PORT = 3000, () => {
    console.log("server on!")
});
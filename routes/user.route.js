const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10;
const User = ("../models/user.model")

router.get('/signup', (request, response) => {
    response.render('signup')
})

router.get('/login', (request, response) => {
    response.render('login')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // find user by username
        const client = await User.findOne({ username })
        if (!client) {
            return res.send('user not found')
        }

        // compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, client.password)
        if (!isMatch) {
            return res.send('Incorrect password')
        }

        res.send('Login successfully!')
    } catch (err) {
        console.error(err);
        res.status(500).send('Error login the user')
    }
})

router.post('/signup', async (req, res) => {
    // const { username, email, password } = req.body;
    const newUser = new User(req.body)
    try {
        // harshed password
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // create and save user with hashed password
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save()


        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user')

    }
})



module.exports = router
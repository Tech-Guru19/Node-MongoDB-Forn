const express = require('express');
const PORT = 9009;
const app = express()
const ejs = require('ejs');
require('dotenv').config();

const userRoute = require("./routes/user.route")

app.use("/user", userRoute)


const mongoose = require('mongoose');
// const { useReducer } = require('react');
const uri = process.env.MONGODB_URI
app.use(express.urlencoded({ extended: true }));

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true }
// })
// const User = mongoose.model('User', userSchema);



const connect = mongoose.connect(uri)
connect.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.set('view engine', 'ejs')
app.get('/', (request, response) => {
    response.send('Hello World!')
})

// app.post('/signup', (request, response) => {
//     console.log(request.body);
//     const newUser = new User(request.body);
//     newUser.save()
//         .then(() => {
//             console.log('User saved successfully');
//             response.redirect('login');
//         })
//         .catch((err) => {
//             console.error('Error saving user:', err);
//             response.status(500).send(`Error saving user: ${err.message}`);
//         });
// })


//  tried it in routes file
// app.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         // harshed password
//         const hashedPassword = await bcrypt.hash(password, saltRounds)

//         // create and save user with hashed password
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save()


//         res.redirect('/login');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error registering user')

//     }
// })


//  tried it in routes file
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         // find user by username
//         const client = await User.findOne({ username })
//         if (!client) {
//             return res.send('user not found')
//         }

//         // compare the entered password with the stored hashed password
//         const isMatch = await bcrypt.compare(password, client.password)
//         if (!isMatch) {
//             return res.send('Incorrect password')
//         }

//         res.send('Login successfully!')
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error login the user')
//     }
// })


app.get('/index', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})


// -- i tried it in the route file
// app.get('/signup', (request, response) => {
//     response.render('signup')
// })

// app.get('/login', (request, response) => {
//     response.render('login')
// })

app.get('/ejs', (request, response) => {
    response.render('index')
})


app.listen(PORT, () => {
    console.log('app is running on port something')
})

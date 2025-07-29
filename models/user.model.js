const mongoose = require('mongoose');
const User = require("../models/user.model")


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const User = mongoose.Model('User', userSchema);

module.exports = User
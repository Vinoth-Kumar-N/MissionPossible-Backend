const mongoose = require('mongoose');

const userRegSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    repassword: {
        type: String,
        required: true
    }
})

const UserRegModel = mongoose.model('Users',userRegSchema );
module.exports = UserRegModel;
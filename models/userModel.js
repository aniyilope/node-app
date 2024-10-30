const mongoose = require('mongoose');

//Define User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type : 'string',
        required : true
    },

    email: {
        type : 'string',
        required : true,
        unique : true
    },
    age: {
        type : 'number',
        required : true
    }
})
//create User model

const User = mongoose.model('User', UserSchema);

module.exports = User;
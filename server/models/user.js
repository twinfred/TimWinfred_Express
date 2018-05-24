const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    first_name: {type: String, require: [true, "A first name is required to create an account."], minlength: [2, "Your first name must be at least 2 characters long."]},
    last_name: {type: String, require: [true, "A last name is required to create an account."], minlength: [2, "Your las name must be at least 2 characters long."]},
    email: {type: String, require: [true, "An email is required to create an account."], minlength: [8, "Your email address is too short."]},
    password: {type: String, require: [true, "A password is required to create an account."], minlength: [8, "Your password is too short."]},
    online: {type: Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);
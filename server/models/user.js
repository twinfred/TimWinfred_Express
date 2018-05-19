const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    first_name: {type: String, require: [true, "A first name is required"], minlength: [3, "Your first name must be at least 3 characters long."]},
    last_name: {type: String, require: [true, "A last name is required"], minlength: [3, "Your las name must be at least 3 characters long."]},
    email: {type: String, require: [true, "An email is required"], minlength: [8, "Your email address is too short."]},
    password: {type: String},
    user_level: {type: Number},
    chats: [{
        message: [{
            msg_date: {type: Date, default: Date.now},
            content: {type: String, require: [true, "You cannot start a chat without a message."], minlength: [1, "Your message is too short to send."]},
            replies: [{
                reply_date: {type: Date, default: Date.now},
                content: {type: String, minlength: [1, "Your message is too short to send."]},
            }]
        }]
    }]
}, {timestamps: true});

module.exports = mongoose.model('products', userSchema);
const mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    sender_fname: {type: String, require: [true, "A first name is required to send a chat message."], minlength: [2, "Your first name must be at least 2 characters long."]},
    sender_lname: {type: String, require: [true, "A last name is required to send a chat message."], minlength: [2, "Your last name must be at least 2 characters long."]},
    sender_email: {type: String, require: [true, "An email is required to send a chat message."]},
    socket: {type: String, require: true },
    messages: [{
        content: {type: String , require: [true, "You cannot start a chat without a message."], minlength: [1, "Your message is too short to send."]},
        user: {type: String}
    }],
}, {timestamps: true});

module.exports = mongoose.model('chats', chatSchema);
const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'timssupersecretawesomekeyisalmostasawesomeasheis',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

require('./server/config/mongoose'); // DB
const Chat = require('./server/models/chat');

require('./server/config/routes')(app); // ROUTES

// SOCKET.IO
var connections = [];
var timsSocket;

io.sockets.on('connection', function(socket){
    connections.push({socket: socket});
    // Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf({socket: socket}), 1);
    });

    // Tim Online
    socket.on('tim_online', function(socketId){
        timsSocket = socketId;

    })

    // New Chat
    socket.on('new_chat', function(chat_id, socketId, callback){
        callback();
        Chat.findOne({_id: chat_id}, (err, chat) =>{
            io.to(socketId).emit('chat_messages', chat['messages']);
            io.to(timsSocket).emit('new_message', chat, socketId);
        })
    })

    // New Individual Message from Admin
    socket.on('individual_msg', function(socket, msg){
        Chat.findOne({socket: socket}, (err, chat) => {
            Chat.update(chat, {$push: {messages: {content: msg, user: "AdminTim"}}}, (err)=>{
                Chat.findOne({socket: socket}, (err, chat) => {
                    io.to(socket).emit('chat_messages', chat['messages']);
                    io.to(timsSocket).emit('chat_messages', chat['messages'], socket);
                })
            })
        })
    })

    // New Individual Message from User
    socket.on('send_msg', function (socket, msg){
        Chat.findOne({socket: socket}, (err, chat) => {
            Chat.update(chat, {$push: {messages: {content: msg, user: chat['messages'][0]['user']}}}, (err)=>{
                Chat.findOne({socket: socket}, (err, chat) => {
                    io.to(socket).emit('chat_messages', chat['messages']);
                    io.to(timsSocket).emit('chat_messages', chat['messages'], socket);
                })
            })
        })
    })
});

server.listen(8000, function(){
    console.log("Server running on port 8000.");
});
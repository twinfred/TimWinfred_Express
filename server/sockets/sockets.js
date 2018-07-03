const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const Chat = require('./../models/chat');

var connections = [];

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log(socket.id)
    // Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
    });

    // New Chat
    socket.on('new_chat', function(chat_id, socketId, callback){
        callback();
        console.log('chat id on server',chat_id);
        console.log('socket id on server', socketId);
        Chat.findOne({_id: chat_id}, (err, chat) =>{
            console.log('chat fint data', chat['messages']);
            io.to(socketId).emit('chat_messages', chat['messages'])
        })
    })
});
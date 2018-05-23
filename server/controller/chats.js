const mongoose = require('mongoose');
const Chat = require('./../models/chat');

module.exports = {
    getChats:
        (req, res) => {
            Chat.find({}, (err, chats) => {
                if(err){
                    res.json({message: "Error", error: err});
                }else{
                    res.json({message: "Success", data: chats});
                }
            })
        },
    getOneChat:
        (req, res) => {
            console.log(req.params.id)
            User.findOne({_id: req.params.id}, (err, chat) => {
                if(!chat){
                    res.json({message: "Error", error: "This chat isn't in the database."});
                }else if(err){
                    res.json({message: "Error", error: err});
                }else{
                    res.json({message: "Success", data: chat});
                }
            })
        },
    createChat:
        (req, res) => {
            Chat.create(req.body, (err, newChat) => {
                if(err){
                    res.json({message: "Error", error: err});
                }else{
                    res.json({message: "Success", data: newChat});
                }
            })
        },
    updateChat:
        (req, res)=>{
            Chat.findOne({_id: req.params.id}, (err, chat)=>{
                if(!chat){
                    res.json({message: "Error", error: "This chat isn't in the database"});
                }else{
                    Chat.update(user, req.body, (err, updatedChat)=>{
                        if(err){
                            res.json({message: "Error", error: err})
                        }else{
                            res.json({message: "Success", data: updatedChat});
                        }
                    })
                }
            })
        },
    destroyChat:
        (req, res)=>{
            Chat.findOne({_id: req.params.id}, (err, chat)=>{
                if(!chat){
                    res.json({message: "Error", error: "This chat isn't in our database"});
                }else{
                    Chat.remove(user, (err)=>{
                        res.json({message: "Success"});
                    })
                }
            })
        },
}
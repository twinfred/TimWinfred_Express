const mongoose = require('mongoose');
const User = require('./../models/user');

module.exports = {
    getUsers:
        (req, res) => {
            User.find({}, (err, users) => {
                if(err){
                    res.json({message: "Error", error: err});
                }else{
                    res.json({message: "Success", data: users});
                }
            })
        },
        getUserById:
        (req, res) => {
            console.log(req.params.id)
            User.findOne({_id: req.params.id}, (err, user) => {
                if(!user){
                    res.json({message: "Error", error: "This user isn't in the database."});
                }else if(err){
                    res.json({message: "Error", error: err});
                }else{
                    res.json({message: "Success", data: user});
                }
            })
        },
     createUser:
        (req, res) => {
            User.create(req.body, (err, newUser) => {
                if(err){
                    res.json({message: "Error", error: err});
                }else{
                    res.json({message: "Success", data: newUser});
                }
            })
        },
    updateUser:
        (req, res)=>{
            User.findOne({_id: req.params.id}, (err, user)=>{
                if(!user){
                    res.json({message: "Error", error: "This user isn't in the database"});
                }else{
                    User.update(user, req.body, (err, updatedUser)=>{
                        if(err){
                            res.json({message: "Error", error: err})
                        }else{
                            res.json({message: "Success", data: updatedUser});
                        }
                    })
                }
            })
        },
    destroyUser:
        (req, res)=>{
            User.findOne({_id: req.params.id}, (err, user)=>{
                if(!user){
                    res.json({message: "Error", error: "This user isn't in the database"});
                }else{
                    User.remove(user, (err)=>{
                        res.json({message: "Success"});
                    })
                }
            })
        },
}
const mongoose = require('mongoose');
const User = require('./../models/user');

module.exports = {
    index:
        (req, res) => {
            res.render("index");
        },
    login:
        (req, res) => {
            res.render("login");
        },
    loginPost:
        (req, res) => {
            User.findOne({email: req.body.email}, (err, user) => {
                if(!user){
                    res.json({message: "Error", error: "The password or email you entered was wrong."});
                }else if(user.password != req.body.password){
                    res.json({message: "Error", error: "The password or email you entered was wrong."});
                }else if(user.password == req.body.password){
                    res.render("admin");
                }
            })
        }
}
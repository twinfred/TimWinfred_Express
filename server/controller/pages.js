const mongoose = require('mongoose');
const User = require('./../models/user');
const session = require('express-session');
const flash = require('express-flash');

module.exports = {
    index:
        (req, res) => {
            User.findOne({}, (err, user)=>{
                if(user){
                    var status = {
                        online: user.online,
                    }
                    res.render("index", status);
                }
            })
        },
    projects:
        (req, res) => {
            User.findOne({}, (err, user)=>{
                if(user){
                    var status = {
                        online: user.online,
                    }
                    res.render("projects", status);
                }
            })
        },
    experience:
        (req, res) => {
            User.findOne({}, (err, user)=>{
                if(user){
                    var status = {
                        online: user.online,
                    }
                    res.render("experience", status);
                }
            })
        },
    about:
        (req, res) => {
            User.findOne({}, (err, user)=>{
                if(user){
                    var status = {
                        online: user.online,
                    }
                    res.render("about", status);
                }
            })
        },
    contact:
        (req, res) => {
            User.findOne({}, (err, user)=>{
                if(user){
                    var status = {
                        online: user.online,
                    }
                    res.render("contact", status);
                }
            })
        },
    login:
        (req, res) => {
            res.render("login");
        },
    loginPost:
        (req, res) => {
            User.findOne({email: req.body.email}, (err, user)=>{
                if(user){
                    if(req.body.password != user.password){
                        req.flash('error', "Incorrect email or password.");
                        return res.redirect('/login');
                    }else{
                        console.log(user);
                        req.session.user_id = user._id;
                        return res.redirect('/admin');
                    }
                }else{
                    req.flash('error', "Incorrect email or password.");
                    return res.redirect('/login');
                }
            })
        },
    register:
        (req, res) => {
            res.render('reg');
        },
    registerPost:
        (req, res) => {
            User.findOne({}, (err, user) => {
                if(user){
                    req.flash('error', 'An admin account already exists');
                    return res.redirect('/register');
                }else{
                    if(req.body.password !== req.body.passConf || !req.body.password){
                        console.log("password error");
                        req.flash('error', "Either your passwords don't match or you didn't input a password");
                        return res.redirect('/register');
                    }else if(req.body.password.length < 8){
                        console.log("password length error");
                        req.flash('error', "Your password needs to be at least 8 characters long");
                        return res.redirect('/register');
                    }else{
                        console.log("passwords good to go");
                        User.findOne({email: req.body.email}, (err, user)=>{
                            // UNIQUE EMAIL VALIDATION
                            if(user){
                                console.log("user already exists")
                                req.flash('error', 'Email already exists');
                                return res.redirect('/register');
                            }else{
                                console.log("attempting to create new user")
                                var newUser = new User();
                                var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if(!emailRegEx.test(req.body.email)){
                                    req.flash('error', 'The email you entered is not the correct format');
                                    return res.redirect('/');
                                }else{
                                    newUser.email = req.body.email;
                                }
                                newUser.first_name = req.body.first_name;
                                newUser.last_name = req.body.last_name;
                                newUser.password = req.body.password;
                                newUser.save(err=>{
                                    if(err){
                                        console.log("save err found")
                                        if(err.errors.email){
                                            req.flash('error', err.errors.email.properties.message);
                                        }
                                        if(err.errors.first_name){
                                            req.flash('error', err.errors.first_name.properties.message);
                                        }
                                        if(err.errors.last_name){
                                            req.flash('error', err.errors.last_name.properties.message);
                                        }
                                        if(err.errors.birthday){
                                            req.flash('error', err.errors.birthday.properties.message);
                                        }
                                        return res.redirect('/register');
                                    }else{
                                        console.log("new user created")
                                        req.session.user_id = newUser._id;
                                        return res.redirect('/admin');
                                    }
                                })
                            }
                        })
                    }
                }
            })
        },
    admin:
        (req, res) => {
            if(!req.session.user_id){
                return res.redirect('/');
            }else{
                User.findOne({_id: req.session.user_id}, (err, user)=>{
                    if(user){
                        var userInSession = {
                            first_name: user.first_name,
                            id: user._id,
                            online: user.online,
                        }
                        return res.render('admin', userInSession);
                    }else{
                        return res.redirect('/');
                    }
                })
            }
        },
    logout:
        (req, res) => {
            if(!req.session.user_id){
                res.redirect('/');
            }else{
                req.session.destroy();
                res.redirect('/');
            }
        }
}
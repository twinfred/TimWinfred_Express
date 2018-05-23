const mongoose = require('mongoose');

module.exports = {
    index:
        (req, res) => {
            res.render("index");
        },
    login:
        (req, res) => {
            res.render("login");
        },
}
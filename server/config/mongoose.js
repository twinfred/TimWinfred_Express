const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/timwinfred_users');
require('./../models/user');
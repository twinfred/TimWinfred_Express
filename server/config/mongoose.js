const mongoose = require('mongoose');

mongoose.connect('mongod://localhost/timwinfred_users');
require('./../models/user');
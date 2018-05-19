const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');

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
require('./server/config/routes')(app); // ROUTES

// REQUIRE SOCKET ROUTES

server.listen(8000, function(){
    console.log("Server running on port 8000.");
});
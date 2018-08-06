var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DBUSERNAME + ':'+ process.env.DBPASSWORD + '@ds113122.mlab.com:13122/course-management');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

var userService = require('./services/user.service.server');
userService(app);

require('./services/section.service.server')(app);
app.listen(process.env.PORT || 3000)
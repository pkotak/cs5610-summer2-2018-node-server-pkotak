var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DBUSERNAME + ':'+ process.env.DBPASSWORD + '@ds113122.mlab.com:13122/course-management');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://cs5610-summer2-2018-angular.herokuapp.com");
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

require('./services/user.service.server')(app);
require('./services/quiz.service.server')(app);
require('./services/question.service.server')(app);
require('./services/section.service.server')(app);

app.listen(process.env.PORT || 3000)
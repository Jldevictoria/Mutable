// Filename:    mutable.js
// Author:      Joseph DeVictoria
// Date:        Sep_30_2016
// Purpose:     Main Express file for Mutable. Mutable is a job board for programmers.
// Includes:
var bcrypt          = require('bcrypt');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var express         = require('express');
var handlebars      = require('express-handlebars');
var http            = require('http');
var mailer          = require('nodemailer');
var path            = require('path');
var sqlite3         = require('sqlite3').verbose();

// Application Setup:
var app = express();
app.set('port', 80);
// Set handlebars as our template engine.
app.engine('handlebars', handlebars());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
// Set the public folder as static and viewable by anyone.
app.use(express.static('public'));
// Enable Body-parser for all requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Enable Cookie-parser for all requests.
app.use(cookieParser());

// Open database:
var db = new sqlite3.Database('./db/mutable.db', function() {
    console.log('Successfully opened mutable.db!');
});

// Launch App Listening on Public Port 80.
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port') + '...');
});

var emailer = mailer.createTransport('smtps://mutablejobs%40gmail.com:MutG0blin@smtp.gmail.com');

// Set up external router file.
require('./router/main')(app, bcrypt, db, emailer);

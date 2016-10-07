// Filename:    mutable.js
// Author:      Joseph DeVictoria
// Date:        Sep_30_2016
// Purpose:     Main Express file for Mutable. Mutable is a job board for programmers.
// Includes:
var bodyParser  = require('body-parser');
var express     = require('express');
var handlebars  = require('express-handlebars');
var http        = require('http');
var sqlite3     = require('sqlite3').verbose();
var path        = require('path');

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
// Set up external router file.
require('./router/main')(app);

// Open database:
var db = new sqlite3.Database('./db/mutable.db', function() {
    console.log('Successfully opened mutable.db!');
});

// Launch App Listening on Public Port 80.
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port') + '...');
});

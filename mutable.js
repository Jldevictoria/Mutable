// Filename:    mutable.js
// Author:      Joseph DeVictoria
// Date:        Sep_30_2016
// Purpose:     Main Express file for Mutable. Mutable is a job board for programmers.
// Includes:
var express     = require('express');
var sqlite3     = require('sqlite3').verbose();
var path        = require('path');
var http        = require('http');
var handlebars  = require('express-handlebars');

// Application Setup:
var app = express();
require('./router/main')(app);
app.set('db', __dirname + '/db');
app.set('private', __dirname + '/private');
app.set('public', __dirname + '/public');
app.set('router', __dirname + '/router');
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.set('port', 80);
app.use(express.static(app.get('public', {dotfiles: 'ignore', etag: false, extensions: ['html'], index: false})));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));

// Databse Setup:
var db = new sqlite3.Database((app.get('db') + 'mutable.db'), function() {
    console.log('Successfully opened mutable.db!');
});

// Launch App Listening on Public Port 80.
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port') + '...');
});

// Includes:
var express     = require('express');
var sqlite3     = require('sqlite3').verbose();
var path        = require('path');
var http        = require('http');
var handlebars  = require('express-handlebars');

// Application Objects:
var app = express();
var db = new sqlite3.Database('mutable.db', function() {
    console.log('Successfully opened mutable.db!');
});
var options = {dotfiles: 'ignore', etag: false, extensions: ['html'], index: false};

// Application Setup:
app.use(express.static(path.join(__dirname, 'public'), options));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', 80);

// Web App Path Requests:
app.get('/', function(req, res) {
    res.render('hello', {name: "Teresa"});
    console.log('Someone requested the home page!');
});

app.get('/poop', function(req, res) {
    res.render('hello', {name: "Poop"});
    console.log('Someone requested the Poop page!');
});

// Launch app listener on public port 80.
app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port') + '...');
});

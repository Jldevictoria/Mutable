// Filename:    main.js
// Author:      Joseph DeVictoria
// Date:        Oct_3_2016
// Purpose:     Main router for Mutable on express.
// Web App Path Requests:
module.exports = function(app) {
    
    app.get('/', function(req, res) {
        res.render('hello', {name: "Joseph"});
        console.log('Someone requested the home page!');
    });

    app.get('/poop', function(req, res) {
        res.render('hello', {name: "Poop"});
        console.log('Someone requested the Poop page!');
    });
    
}

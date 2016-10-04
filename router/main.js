// Filename:    main.js
// Author:      Joseph DeVictoria
// Date:        Oct_3_2016
// Purpose:     Main router for Mutable on express.
// Web App Path Requests:
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('main', {name: "Joseph"});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Home page!');
    });
}

// Filename:    main.js
// Author:      Joseph DeVictoria
// Date:        Oct_3_2016
// Purpose:     Main router for Mutable on express.

// Web App Path Requests:
module.exports = function(app) {
    // Get Handlers
    app.get('/', function(req, res) {
        res.render('main'); //, {key: "value"});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Home page!');
    });
    
    app.get('/jobs', function(req, res) {
        res.render('jobs', {id: "1337"});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Jobs page!');
    });
    
    app.get('/job/:id', function(req, res) {
        res.render('job', {id: req.params.id});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Job page for job ' + req.params.id);
    });
    
    app.get('/apply/:id', function(req, res) {
        res.render('apply', {id: req.params.id});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Application page for job ' + req.params.id);
    });
    
    app.get('/challenge/:id', function(req, res) {
        res.render('challenge', {id: req.params.id});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Challenge page for job ' + req.params.id);
    });
    app.get('/applications', function(req, res) {
        res.render('applications');
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Applications page!');
    });
    
    app.get('/profile', function(req, res) {
        res.render('profile');
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Profile page!');
    });
    
    app.get('/about', function(req, res) {
        res.render('about');
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the About page!');
    });

    // Post handlers.
    app.post('/challenge/save/:id', function(req, res) {
        res.render('save', {fileName: req.body.fileName, fileContent: JSON.parse(req.body.fileContent)});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' posted data to the Save page for job ' + req.params.id);
    });
}

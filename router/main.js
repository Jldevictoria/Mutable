// Filename:    main.js
// Author:      Joseph DeVictoria
// Date:        Oct_3_2016
// Purpose:     Main router for Mutable on express.

// Web App Path Requests:
module.exports = function(app, bcrypt, db, emailer) {
    // Get Handlers
    app.get('/', function(req, res) {
        res.render('main'); //, {key: "value"});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Home page!');
    });
    
    app.get('/about', function(req, res) {
        res.render('about');
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the About page!');
    });
    
    app.get('/applications', function(req, res) {
        res.render('applications');
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Applications page!');
    });
    
    app.get('/apply/:id', function(req, res) {
        res.render('apply', {id: req.params.id});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Application page for job ' + req.params.id);
    });
    
    app.get('/challenge/:id', function(req, res) {
        res.render('challenge', {id: req.params.id});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Challenge page for job ' + req.params.id);
    });
    
    app.get('/jobs', function(req, res) {
        res.render('jobs', {id: "1337"});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Jobs page!');
    });
    
    app.get('/job/:id', function(req, res) {
        res.render('job', {id: req.params.id});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Job page for job ' + req.params.id);
    });

    app.get('/login', function(req, res) {
        res.render('login', { loggedout: true });
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Login page!');
    });

    app.get('/logout', function(req, res) {
        res.render('logout');
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Logout page!');
    });
    
    app.get('/profile', function(req, res) {
        res.render('profile');
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Profile page!');
    });

    app.get('/register', function(req, res) {
        res.render('register', { get: true });
        console.log('User at ' + req.headers['x-forwarded-for'] + ' requested the Registration page!');
    });

    app.get('/register/verify/:salt', function(req, res) {
        var salt = req.params.salt;
        db.get("SELECT * FROM accounts WHERE salt = '" + salt + "';", function(err, row) {
            if (row) {
                var username = row.username;
                db.run("UPDATE accounts SET active = 1 WHERE salt = '" + salt + "';");
                res.render('verify', { flag: true, user: username });
                console.log('User at ' + req.headers['x-forwarded-for'] + ' successfully verified the account "' + username + '"!');
            }
            else {
                res.render('verify', { flag: false });
                console.log('User at ' + req.headers['x-forwarded-for'] + ' failed to verify the salt ' + salt + '!');
            }
        });
    });

    // Post handlers.
    app.post('/challenge/save/:id', function(req, res) {
        res.render('save', {fileName: req.body.fileName, fileContent: JSON.parse(req.body.fileContent)});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' posted data to the Save page for job ' + req.params.id);
    });

    app.post('/login', function(req, res) {
        db.get("SELECT * FROM accounts WHERE username = '" + req.body.login_username + "';", function(err, row) {
            if (row) {
                var key = bcrypt.hashSync(req.body.login_password, row.salt);
                if (key == row.key) {
                    console.log("User " + row.username + " supplied the correct password for login!");
                    res.render('login', { loggedin: true });
                }
                else {
                    console.log("User " + row.username + " supplied an incorrect password for login!");
                    res.render('login', { loggedout: true, incorrect: true });
                }
            }
            else {
                console.log("User " + req.body.login_username + " not found for login...");
                res.render('login', { loggedout: true, incorrect: true });
            }
        });
        console.log('User at ' + req.headers['x-forwarded-for'] + ' posted data to the Login page! (Login attempt)');
    });

    app.post('/logout', function(req, res) {
        res.render('logout');
        console.log('User at ' + req.headers['x-forwarded-for'] + ' posted data to the Logout page! (logged out)');
    });

    app.post('/register', function(req, res) {
        var username = req.body.registration_username;
        var email = req.body.registration_email;
        var employer = 0;
        var companyname = "none";
        var firstname = "none";
        var lastname = "none";
        if (req.body.registration_employer == "Yes") {
            employer = 1;
            companyname = req.body.registration_companyname;
        }
        else {
            firstname = req.body.registration_firstname;
            lastname = req.body.registration_lastname;
        }
        var salt = bcrypt.genSaltSync(10);
        var key = bcrypt.hashSync(req.body.registration_password_first, salt);
        var query = "INSERT INTO accounts (active, username, email, employer, companyname, firstname, lastname, salt, key) " +
                    "VALUES (0, '" + username + "', '" + email + "', " + employer + ", '" + companyname + "', '" + 
                    firstname + "', '" + lastname + "', '" + salt + "', '" + key + "');";
        db.get("SELECT * FROM accounts WHERE username = '" + username + "' OR email = '"  + email + "';", function(err, row) {
            if (row) {
                res.render('register', { get: true, exists: true });
            }    
            else {
                emailer.sendMail({
                    from: '"Mutable Jobs", <mutablejobs@gmail.com>',
                    to: email,
                    subject: "Verify Your Mutable Account!",
                    text: ("Hello " + username + ",\r\n\r\nPlease verify your Mutable account by clicking the following link:\r\n" +
                          "https://www.mutable.cc/register/verify/" + salt + " \r\n\r\nRegards,\r\nMutable Team")
                }, function(error, response) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("Sucessfully sent a verification email to " + email);
                    }
                });
                db.run(query);
                res.render('register', { post: true });
            }
        }); 
        console.log('User at ' + req.headers['x-forwarded-for'] + ' posted data to the Register page!');
    });
    
    // Errorr handlers
    app.use(function(req, res) {
        res.status(404);
        res.render('404', {page: req.originalUrl});
        console.log('User at ' + req.headers['x-forwarded-for'] + ' generated a 404 error requesting "' + req.originalUrl + '"!');
    });

    app.use(function(error, req, res, next) {
        if (error.status == 500) {
            res.status(500);
            res.render('505');
            console.log('User at ' + req.headers['x-forwarded-for'] + ' generated a 500 error requesting "' + req.originalUrl + '"!');
        }
    });
}

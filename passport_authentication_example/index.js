var express = require('express');
var app = express();
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    callbackURL: 'http://localhost:5555/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
    // placeholder for translating profile into your own custom user object
    // for now we will just use the profile object returned by github.
    return done(null, profile);
}
));


// Express and Passport session
var session = require('express-session');
app.use(session({secret:'enter custom sessions secrete here'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){ 
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    // maybe you are getoing to get the user from mongo by id?
    // null is for errors
    done(null, user);
})

//we will call this to start the GitHub Login process
app.get('auth/github', passport.authenticate('github'));

// GitHub will call this URL
app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/'}),
    function(req, res) {
        res.redirect('/');
    });

app.get('/', function(req, res) {
    var html = "<ul>\n<li><a href='/auth/github'>GitHub</a></li>\n<li><a href='/logout'>Logout</a></li></ul>";
    // dump the user for debugging
    if (req.isAuthenticated()) {
        html += '<p>Authenticated as user: </p>'
        html += '<pre>' + JSON.stringify(req.user, null, 4) + '</pre>';
    }
    res.send(html);
})

app.get('/logout', function(req, res) {
    console.log('logging out');
    req.logOut();
    res.redirect('/');
})

// Simple route middelware to ensure use is authenticated.
// Use this route middleware on any resource that needs to be protected. if 
// the request is authenticated (typically via a persistent login session),
// the request will be processed. Otherwise, the user will be redirected to the login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {return next()}
    res.redirect('/');
}

app.get('/protected', ensureAuthenticated, function(req, res) {
    res.send('Access granted');
});

var server = app.listen(5555, function(){
    console.log('Example app listening at http://localhost:5555');
})
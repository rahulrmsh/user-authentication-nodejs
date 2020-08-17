var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('register', { 'title': 'Register' });
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
    var inputName = req.body.inputName;
    var inputEmail = req.body.inputEmail;
    var inputUsername = req.body.inputUsername;
    var inputPassword = req.body.inputPassword;
    var inputCheckPassword = req.body.inputCheckPassword;
    if (req.file) {
        var profileimage = req.file.filename;
    } else {
        var profileimage = 'noimage.jpg';
    }
    req.checkBody('inputName', "Name field is required").notEmpty();
    req.checkBody('inputEmail', "Email field is required").notEmpty();
    req.checkBody('inputEmail', "Email is required").isEmail();
    req.checkBody('inputUsername', "username field is required").notEmpty();
    req.checkBody('inputPassword', "Password field is required").notEmpty();
    req.checkBody('inputCheckPassword', "Passwords do not match ").equals(req.body.inputPassword);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            name: inputName,
            email: inputEmail,
            username: inputUsername,
            password: inputPassword,
            profileimage: profileimage
        });

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
        });
        req.flash('success', " Registration Successful");
        res.location('/');
        res.redirect('/');
    }
});

router.get('/login', function(req, res, next) {
    res.render('login', { 'title': 'Login' });
});

router.post('/login',
    passport.authenticate(new LocalStrategy({ usernameField: 'inputUsername', passwordField: 'inputPassword' },
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    )));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, function(username, password, done) {
    User.getUserByusername(username, function(err, user) {
        if (err) throw err;
        if (!user) {
            return done(null, false, { message: 'Unknown User' });
        }
        user.comparePassword(password, user.password, function(err, isMatch) {
            if (err) return done(err);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid Password' });
            }
        });
    });
}));

router.get('/logout', function(req, res, next) {
    res.render('logout', { 'title': 'Logout' });
});

module.exports = router;
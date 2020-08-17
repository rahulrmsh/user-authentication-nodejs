var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });

var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* GET and POST register. */
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
        req.flash('success', "You're in");
        res.location('/');
        res.redirect('/');
    }
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login', { 'title': 'Login' });
});
router.post('/login', function(req, res, next) {});

router.get('/logout', function(req, res, next) {
    res.render('logout', { 'title': 'Logout' });
});

module.exports = router;
var express = require('express');
var expressValidator = require('express-validator');
api.use(expressValidator())
var api = express.Router();
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });

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
    req.checkBody('inputCheckPassword', "Password Incorrect").equals(req.body.inputPassword);
    req.checkBody('name', "Name field is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
        console.log(errors);
    } else {
        console.log('No Errors');
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
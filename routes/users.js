var express = require('express');
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
    console.log(req.body.inputName);
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
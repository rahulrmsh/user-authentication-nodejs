var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/register', function(req, res, next) {
    res.render('register', { 'title': 'Register' });
});
router.post('/register', function(req, res, next) {});
router.get('/login', function(req, res, next) {
    res.render('login', { 'title': 'Login' });
});
router.post('/login', function(req, res, next) {});
router.get('/logout', function(req, res, next) {
    res.render('logout', { 'title': 'Logout' });
});

module.exports = router;
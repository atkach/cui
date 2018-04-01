var express = require('express');
var basicAuth = require('basic-auth');
var router = express.Router();
var booksRoute = require('./books');
var authorsRoute = require('./authors');


const USERNAME = 'admin';
const PASSWORD = 'admin';

module.exports = router;

router.use(function(req, res, next) {
  console.log(req.method + ' call to ' + req.url);
  next();
});

router.post('/login', function(req, res, next) {
  if (req.body.username !== USERNAME || req.body.password !== PASSWORD) {
    res.statusCode = 403;
    res.end('Incorrect credentials');
  } else {
    res.end('Login successful');
    next();
  }
});

router.all('*', function(req, res, next) {
  var user = basicAuth(req);
  if (!user || user.name !== USERNAME || user.pass !== PASSWORD) {
    //res.setHeader('WWW-Authenticate', 'Basic');
    res.statusCode = 401;
    res.end('Access denied');
  } else {
    next();
  }
});

router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to our api!' });
  next();
});


booksRoute.init(router);
authorsRoute.init(router);

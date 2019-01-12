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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,GET,HEAD,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
});

router.post('/login', function(req, res, next) {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  
  const user = basicAuth(req);
  if (!user || user.name !== USERNAME && user.pass !== PASSWORD) {
    return res.status(403).json({ message: 'Invalid Authentication Credentials' });
  }
  res.json({ message: 'Login successful' });
});

router.all('*', function(req, res, next) {
  const user = basicAuth(req);
  if (req.method === 'OPTIONS') {
    return next();
  }
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

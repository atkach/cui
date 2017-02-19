var express = require('express');
var basicAuth = require('basic-auth');
var router = express.Router();


//Models
var Book = require('../models/book');

module.exports = router;

router.use(function(req, res, next) {
  console.log(req.method + ' call to ' + req.url);
  next();
});

router.post('/login', function(req, res, next) {
  if (req.body.username !== 'admin' || req.body.password !== 'admin') {
    res.statusCode = 403;
    res.end('Incorrect credentials');
  } else {
    res.end('Login successful');
    next();
  }
});

router.all('*', function(req, res, next) {
  var user = basicAuth(req);
  if (!user || user.name !== 'admin' || user.pass !== 'admin') {
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


router.route('/books')
  .post(function(req, res) {
    var book = new Book();
    book.name = req.body.name;

    book.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'book created!' });
    });
  })
  .get(function(req, res) {
    Book.find(function(err, books) {
      if (err) {
        res.send(err);
      }
      res.json(books);
    });
  });

router.route('/books/:book_id')
  .get(function(req, res) {
    Book.findById(req.params.book_id, function(err, book) {
      if (err) {
        res.send(err);
      }
      res.json(book);
    });
  })
  .put(function(req, res) {
    Book.findById(req.params.book_id, function(err, book) {
      if (err) {
        res.send(err);
      }
      book.name = req.body.name;
      book.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Book updated!' });
      });
    });
  })
  .delete(function(req, res) {
    Book.remove({
      _id: req.params.book_id
    }, function(err, book) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted' });
    });
  });

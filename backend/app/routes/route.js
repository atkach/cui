var express = require('express');
var router = express.Router();


//Models
var Book = require('../models/book');

module.exports = router;

router.use(function(req, res, next) {
  console.log(req.method + ' call to ' + req.url);
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
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

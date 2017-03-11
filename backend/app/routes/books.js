var Book = require('../models/book');

module.exports = {
  init: function(router) {
    router.route('/books')
      .post(function(req, res) {
        var book = new Book();
        requestBodyToBook(req.body, book);

        book.save(function(err) {
          if (err) {
            res.statusCode = 400;
            return res.send(err);
          }
          res.json({ message: 'book created!' });
        });
      })
      .get(function(req, res) {
        Book.find(function(err, books) {
          if (err) {
            return res.send(err);
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
          requestBodyToBook(req.body, book);
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
  }
};

function requestBodyToBook(body, book) {
  for(var key in body) {
    book[key] = body[key];
  }
}
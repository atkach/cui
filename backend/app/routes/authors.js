var Author = require('../models/author');

module.exports = {
  init: function(router) {
    router.route('/authors')
      .post(function(req, res) {
        var author = new Author();
        requestBodyToAuthor(req.body, author);

        author.save(function(err, product) {
          if (err) {
            res.statusCode = 400;
            return res.send(err);
          }
          res.json({
            author_id: product._id,
            message: 'author created!'
          });
        });
      })
      .get(function(req, res) {
        Author.find(function(err, authors) {
          if (err) {
            return res.send(err);
          }
          res.json({
            "authors": authors.map((a) => a.toJSON())
          });
        });
      });

    router.route('/authors/:author_id')
      .get(function(req, res) {
        Author.findById(req.params.author_id, function(err, author) {
          if (err) {
            res.send(err);
          }
          res.json({
            "author": author.toJSON()
          });
        });
      })
      .put(function(req, res) {
        Author.findById(req.params.author_id, function(err, author) {
          if (err) {
            res.send(err);
          }
          requestBodyToAuthor(req.body, author);
          author.save(function(err) {
            if (err) {
              res.send(err);
            }
            res.json({ message: 'Author updated!' });
          });
        });
      })
      .delete(function(req, res) {
        Author.remove({
          _id: req.params.author_id
        }, function(err, author) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Successfully deleted' });
        });
      });
  }
};

function requestBodyToAuthor(body, author) {
  for(var key in body) {
    if (key === 'books') {
      author[key] = JSON.parse(body[key]);
    } else {
      author[key] = body[key];
    }
  }
}

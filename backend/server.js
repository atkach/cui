var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./../frontend"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

var port = process.env.PORT || 8080;

/**
 * connect to mongo DB
 */
mongoose.connect('mongodb://localhost:27017/cui');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api/v1', router);


/**
 * start a localhost server
 */
app.listen(port, function(){
  console.log('Express server listening on http://localhost:8080');
});



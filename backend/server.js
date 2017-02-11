var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var route = require('./app/routes/route');

var UI = 'angular-ui/dist';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./../" + UI)));

var port = process.env.PORT || 8080;

/**
 * connect to mongo DB
 */
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/cui');

/**
 * Connect routes
 */
app.use('/api/v1', route);

/**
 * start a localhost server
 */
app.listen(port, function(){
  console.log('Express server listening on http://localhost:8080');
});



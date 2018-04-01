
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
  name: String,
  authors: [String],
  year: Number,
  rating: Number,
  read: Boolean,
  review: String
});

module.exports = mongoose.model('Book', BookSchema);
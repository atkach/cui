
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AuthorSchema   = new Schema({
  firstName: String,
  lastName: String,
  birthday: Date,
  books: [String],
  biography: String
});

module.exports = mongoose.model('Author', AuthorSchema);
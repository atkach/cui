
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;


const AuthorSchema   = new Schema({
  firstName: String,
  lastName: String,
  birthday: Date,
  books: [String],
  biography: String
});

AuthorSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Author', AuthorSchema);
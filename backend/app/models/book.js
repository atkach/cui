
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;



const BookSchema   = new Schema({
  name: String,
  authors: [String],
  year: Number,
  rating: Number,
  read: Boolean,
  review: String
});

BookSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Book', BookSchema);
const mongoose = require('mongoose')

let book = new mongoose.Schema({
  bookTitle: {type: mongoose.SchemaTypes.String, required: true},
  bookYear: {type: Number,
    min: 250,
    max: (new Date()).getFullYear(),
    required: true},
  bookPoster: {type: mongoose.SchemaTypes.String, required: true},
  bookAuthor: {type: mongoose.SchemaTypes.String}
})

module.exports = mongoose.model('Book', book)

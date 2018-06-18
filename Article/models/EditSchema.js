const mongoose = require('mongoose')

let edit = new mongoose.Schema({

  author: {type: mongoose.SchemaTypes.String, required: true},
  content: {type: mongoose.SchemaTypes.String, required: true},
  creationDate: {type: mongoose.SchemaTypes.Date, default: Date.now},
  article: {type: mongoose.SchemaTypes.ObjectId, ref: 'Article'}
})

module.exports = mongoose.model('Edit', edit)

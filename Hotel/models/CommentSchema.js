const mongoose = require('mongoose')

let comment = new mongoose.Schema({
  title: {type: mongoose.SchemaTypes.String, required: true},
  commentText: {type: mongoose.SchemaTypes.String, required: true},
  author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true},
  authorName: {type: mongoose.SchemaTypes.String, required: true},
  creationDate: {type: mongoose.SchemaTypes.Date, default: Date.now}

})

module.exports = mongoose.model('Comment', comment)

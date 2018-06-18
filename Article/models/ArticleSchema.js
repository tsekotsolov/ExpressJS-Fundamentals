const mongoose = require('mongoose')

let article = new mongoose.Schema({
  title: {type: mongoose.SchemaTypes.String, required: true},
  edits: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Edit'}],
  lockStatus: {type: mongoose.SchemaTypes.Boolean, default: false}
})

module.exports = mongoose.model('Article', article)

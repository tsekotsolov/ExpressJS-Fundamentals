const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  url: {type: mongoose.SchemaTypes.String, required: true},
  creationDate: {type: mongoose.SchemaTypes.Date, required: true, default: Date.now},
  description: {type: mongoose.SchemaTypes.String},
  tags: [{type: mongoose.SchemaTypes.ObjectId}]
})

module.exports = mongoose.model('Image', ImageSchema)

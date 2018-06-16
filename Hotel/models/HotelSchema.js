const mongoose = require('mongoose')
const commentSchema = mongoose.model('Comment').schema

let hotel = new mongoose.Schema({
  title: {type: mongoose.SchemaTypes.String, required: true, unique: true},
  location: {type: mongoose.SchemaTypes.String, required: true},
  image: {type: mongoose.SchemaTypes.String, required: true},
  type: {type: mongoose.SchemaTypes.String, required: true},
  description: {type: mongoose.SchemaTypes.String, required: true},
  creationDate: {type: mongoose.SchemaTypes.Date, default: Date.now},
  likes: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
  views: {type: mongoose.SchemaTypes.Number, default: 0},
  comments: [commentSchema]

})

module.exports = mongoose.model('Hotel', hotel)

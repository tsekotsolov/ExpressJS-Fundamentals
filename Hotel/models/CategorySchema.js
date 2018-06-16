const mongoose = require('mongoose')

let category = new mongoose.Schema({
  categoryTitle: {type: mongoose.SchemaTypes.String, required: true, unique: true},
  hotels: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Hotel'}]

})

module.exports = mongoose.model('Category', category)

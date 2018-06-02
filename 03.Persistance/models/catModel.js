const mongoose = require('mongoose')

let catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  color: {
    type: String
  }
})

// Attaches a function to the scheme
catSchema.methods.sayHello = function () {
  return `Hi from ${this.name}`
}
// Attaches a virtual property to the scheme.
catSchema.virtual('description').get(function () {
  return `Cat description : Cat name: ${this.name}, Cat age: ${this.age}`
})

// Attaches a validation to a certian property
catSchema.path('age').validate(function () {
  return this.age >= 1 && this.age <= 100
}, 'Age must be between 1 and 100')

let Cat = mongoose.model('Cat', catSchema)

module.exports = Cat

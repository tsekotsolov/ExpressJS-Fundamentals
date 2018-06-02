const mongoose = require('mongoose')
const Cat = require('./models/catModel')
let connectionString = 'mongodb://localhost:27017/cats'

// let Cat = mongoose.model('Cat', {
//   name: {type: String, required: true},
//   age: {type: Number, required: true},
//   color: {type: String}
// })

// let Owner = mongoose.model('Owner', {
//   firstName: {type: String, required: true},
//   age: {type: Number, required: true},
//   cats: [Cat.schema]
// })

mongoose
  .connect(connectionString)
  .then(() => {
    // Store cast into base

    let myCat = new Cat({
      name: 'Juli',
      age: 21,
      color: 'white'
    })

    myCat.save((err, info) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(`Cat added to DataBase`)
    })

    // Cat.find({}).then(cats => {
    //   let owner = new Owner({
    //     firstName: 'Misho',
    //     age: 45,
    //     cats
    //   })
    //   owner.save()
    // })

    Cat.findOne({
      name: 'Tseko'
    })
      .then((cat) => {
        console.log(cat.description)
        cat.name = 'Tseko Tsolov'
        cat.save()
      })
      .catch(() => console.log(`Cat not found`))
  })

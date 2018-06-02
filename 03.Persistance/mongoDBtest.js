const mongodb = require('mongodb')
let connectionString = 'mongodb://localhost:27017/pets' // name of the db

mongodb.MongoClient
  .connect(connectionString).then(client => {
    let db = client.db('pets')
    let dogs = db.collection('dogs')
    dogs.insert({
      'name': 'George',
      'age': 2,
      'breed': 'huskey'
    })
    dogs.find({}).toArray((err, dogs) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(dogs)
    })
  })

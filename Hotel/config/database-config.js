const mongoose = require('mongoose')
const User = require('../models/User')
const Comment = require('../models/CommentSchema')
const Category = require('../models/CategorySchema')

module.exports = (config) => {
  mongoose.connect(config.connectionString)

  let db = mongoose.connection

  db.once('open', (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Mongo connected successfully')

    // Add admin user on first connect
    User.seedAdminUser()
  })

  db.on('error', (err) => {
    console.log(err)
  })
}

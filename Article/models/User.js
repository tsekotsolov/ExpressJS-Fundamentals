const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const REQUIERED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  username: {type: String, required: REQUIERED_VALIDATION_MESSAGE, unique: true},
  salt: {type: String},
  hashedPass: {type: String},
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then((users) => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, 'admin123')

    User.create({
      username: 'admin',
      firstName: 'admin',
      lastName: 'admin',
      salt,
      hashedPass,
      roles: ['Admin']
    })
  })
}

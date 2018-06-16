const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {

  registerGet: (req, res) => {
    res.render('users/loginRegister')
  },
  registerPost: (req, res) => {
    let userData = req.body
    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, userData.password)

    User.create({
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      salt: salt,
      hashedPass: hashedPass
    }).then((user) => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/loginRegister')
        }
        res.redirect('/')
      })
    }).catch((err) => {
      res.locals.globalError = err
      res.render('users/loginRegister')
    })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },

  loginPost: (req, res) => {
    let username = req.body.username
    let password = req.body.password

    User.findOne({username: username})
      .then((user) => {
        if (!user) {
          res.locals.globalError = 'Invalid user credentials'
          res.render('users/loginRegister')
          return
        }
        if (!user.authenticate(password)) {
          res.locals.globalError = 'Invalid user credentials'
          res.render('users/loginRegister')
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/loginRegister')
          }
          res.redirect('/')
        })
      }).catch(() => {
        res.locals.globalError = 'Invalid user credentials'
        res.render('users/loginRegister')
      })
  }
}

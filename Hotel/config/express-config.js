// Prepare the middleware functions and view engine

const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const fileUploader = require('express-fileupload')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = (app, config) => {
  // Handlebars set up

  app.engine('hbs', handlebars({
    extname: '.hbs',
    partialDir: ('views/partials'),
    defaultLayout: 'main'
  }))

  app.set('view engine', '.hbs')

  // Handle static files
  app.use('/public', express.static(path.join(config.rootPath, '../public')))

  // File uploader setup
  app.use(fileUploader())

  // Body-Parser setup
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  // User and Auth setup
  app.use(cookieParser())

  app.use(session({
    secret: 'secretoftheuniverse',
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
      res.locals.isAdmin = req.user.roles.indexOf('Admin') >= 0
    }
    next()
  })
}

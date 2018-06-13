// Prepare the middleware functions and view engine

const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const fileUploader = require('express-fileupload')
const bodyParser = require('body-parser')

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
}

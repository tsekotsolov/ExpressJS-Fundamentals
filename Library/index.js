const express = require('express')
const port = process.env.PORT || 2000
let app = express()
let config = require('./config/config')
let dataBase = require('./config/database-config')

// Establish DataBase connection
dataBase(config.development)

// Set up Express configuration
require('./config/express-config')(app, config.development)

// Set up routes
require('./config/routes')(app)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

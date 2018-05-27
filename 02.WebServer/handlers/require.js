const homePageHandler = require('./homepage-handler')
const staticHandler = require('./static-handler')
const viewAllHandler = require('./viewall-handler')
const errorHandler = require('./error-handler')

module.exports = [
  homePageHandler,
  viewAllHandler,
  staticHandler,
  errorHandler
]

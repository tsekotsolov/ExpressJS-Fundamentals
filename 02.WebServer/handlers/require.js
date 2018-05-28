const homePageHandler = require('./homepage-handler')
const staticHandler = require('./static-handler')
const viewAllHandler = require('./viewall-handler')
const errorHandler = require('./error-handler')
const viewFormHandler = require('./viewform-handler')

module.exports = [
  homePageHandler,
  viewAllHandler,
  viewFormHandler,
  staticHandler,
  errorHandler
]

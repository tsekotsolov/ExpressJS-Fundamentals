const http = require('http')
const url = require('url')
const port = 7000

const homePageHandler = require('./handlers/homepage-handler')
const staticHandler = require('./handlers/static-handler')
const viewAllHandler = require('./handlers/viewall-handler')
const errorHandler = require('./handlers/error-handler')


http.createServer((request, response) => {
  request.path = url.parse(request.url).pathname
 
  let handlers = [
    homePageHandler,
    viewAllHandler,
    staticHandler,
    errorHandler
  ]

  for (const handler of handlers) {
    if (handler(request, response) !== true) {
      break
    }
  }
}).listen(port)

console.log(`Server listening on port ${port}...`)

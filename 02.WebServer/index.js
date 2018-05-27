const http = require('http')
const url = require('url')
const handlers = require('./handlers/require')
const port = 7000

http.createServer((request, response) => {
  request.path = url.parse(request.url).pathname
 
  for (const handler of handlers) {
    if (handler(request, response) !== true) {
      break
    }
  }
}).listen(port)

console.log(`Server listening on port ${port}...`)

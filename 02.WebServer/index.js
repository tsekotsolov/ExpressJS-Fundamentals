const http = require('http')
const url = require('url')
const fs = require('fs')
const handlers = require('./handlers/require')
const port = 7000

http.createServer((request, response) => {
  request.path = url.parse(request.url).pathname

  response.writeHtml = (path) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      if (path.endsWith('error.html')) {
        response.writeHead(400, {
          'content-type': 'text/html'
        })
      } else {
        response.writeHead(200, {
          'content-type': 'text/html'
        })
      }

      response.write(data)
      response.end()
    })
  }

  for (const handler of handlers) {
    if (handler(request, response) !== true) {
      break
    }
  }
}).listen(port)

console.log(`Server listening on port ${port}...`)

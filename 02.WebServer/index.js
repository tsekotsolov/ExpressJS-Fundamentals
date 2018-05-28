const http = require('http')
const url = require('url')
const fs = require('fs')
const handlers = require('./handlers/require')
const port = 7000

let getStatusCode = (path) => {
  let statusCode = 200
  if (path.endsWith('error.html')) {
    statusCode = 404
  }
  return statusCode
}

http.createServer((request, response) => {
  request.path = url.parse(request.url).pathname

  response.writeHtml = (path) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      response.writeHead(getStatusCode(path), {
        'content-type': 'text/html'
      })
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

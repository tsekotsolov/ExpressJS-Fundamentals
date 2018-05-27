const fs = require('fs')

module.exports = (request, response) => {
  let contentType = 'text/plain'

  if (request.path.endsWith('.css')) {
    contentType = 'text/css'
  } else if (request.path.endsWith('.ico')) {
    contentType = 'image/x-icon'
  } else if (request.path.endsWith('.png')) {
    contentType = 'image/png'
  }

  fs.readFile(`.${request.path}`, (err, data) => {
    if (err) {
      response.writeHead(404)
      response.write('404: Not Found')
      response.end()
      return
    }
    response.writeHead(200, {
      'content-type': contentType
    })
    response.write(data)
    response.end()
  })
}

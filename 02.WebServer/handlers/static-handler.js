const fs = require('fs')

module.exports = (request, response) => {

  if (request.path.startsWith('/public')) {
    
    let contentType = 'text/plain'

    if (request.path.endsWith('.css')) {
      contentType = 'text/css'
    } else if (request.path.endsWith('.ico')) {
      contentType = 'image/x-icon'
    } else if (request.path.endsWith('.png')) {
      contentType = 'image/png'
    } else if (request.path.endsWith('.js')) {
      contentType = 'application/javascript'
    }

    fs.readFile(`.${request.path}`, (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      response.writeHead(200, {
        'content-type': contentType
      })
      response.write(data)
      response.end()

    })
  } else {
    return true
  }

}
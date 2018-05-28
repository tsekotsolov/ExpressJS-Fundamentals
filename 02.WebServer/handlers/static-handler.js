const fs = require('fs')

function contentTypeChecker(url) {

  let contentType = 'text/plain'
  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.ico')) {
    contentType = 'image/x-icon'
  } else if (url.endsWith('.png')) {
    contentType = 'image/png'
  } else if (url.path.endsWith('.jpg')) {
    contentType = 'image/jpg'
  } else if (url.path.endsWith('.js')) {
    contentType = 'application/javascript'
  }

  return contentType
}

module.exports = (request, response) => {

  if (request.path.startsWith('/public') && request.method ==='GET') {


    fs.readFile(`.${request.path}`, (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      response.writeHead(200, {
        'content-type': contentTypeChecker(request.path)
      })
      response.write(data)
      response.end()
    })
  } else {
    return true
  }
}

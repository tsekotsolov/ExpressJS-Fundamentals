const fs = require('fs')

module.exports = (request, response) => {
  if (request.path === '/' || request.path ==='/home.html') {
    fs.readFile('./views/home.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      response.writeHead(200, {
        'content-type': 'text/html'
      })

      response.write(data)
      response.end()
    })
  } else {
    return true
  }
}

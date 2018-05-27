const fs = require('fs')

module.exports = (request, response) => {
  fs.readFile('./views/error.html', (err, data) => {

    if (err) {
      console.log(error)
      return
    }
    response.writeHead(404, {
      'content-type': 'text/html'
    })

    response.write(data)
    response.end()
  })
}
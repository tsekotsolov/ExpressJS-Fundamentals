const fs = require('fs')
const qs = require('querystring')
const db = require('../config/dataBase')

module.exports = (request, response) => {
  if (request.path === '/addMovie' && request.method === 'GET') {
    response.writeHtml('./views/addMovie.html')
  } else if (request.path === '/addMovie' && request.method === 'POST') {
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      let movieToPush = qs.parse(body)
      if (Object.values(movieToPush).includes('')) {
        console.log('ima prazni poleta')
      } else {
        console.log('niama prazni poleta')
        db.push(movieToPush)
        fs.readFile('./views/addMovie.html', (err, data) => {
          if (err) {
            console.log(err)
            return
          }
          response.writeHead(200, {
            'content-type': 'text/html'
          })
          let html = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>')
          console.log(html)
          response.write(data)
          response.end()
        })
      }
    })
  } else {
    return true
  }
}

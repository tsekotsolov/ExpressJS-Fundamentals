const fs = require('fs')

module.exports = (request, response) => {
  if (request.path === '/viewAllMovies' && request.method === 'GET') {
    fs.readFile('./views/viewAll.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      const movieTemplate = `<div class="movie"><img class="moviePoster" src="{{Your movie poster URL}}"/></div>`

      let allMovies = request.db.map(m => movieTemplate.replace('{{Your movie poster URL}}', decodeURIComponent(m.moviePoster))).join(' ')

      data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', allMovies)

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

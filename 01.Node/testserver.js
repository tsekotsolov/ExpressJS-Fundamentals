let http = require('http')
let port = 3000

http.createServer((request, response) => {
  if (request.method === 'GET') {
    switch (request.url) {
      case '/':
        response.write('Home')
        response.end()

        break

      case '/about':
        response.write('About')
        response.end()

        break

      default:
        response.write('404: Not Found')
        response.end()
        break
    }
  }
}).listen(port)

console.log(`Server listening on port ${port}...`)

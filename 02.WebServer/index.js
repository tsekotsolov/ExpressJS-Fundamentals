const http = require('http')
const fs = require('fs')
const url = require('url')
const port = 7000

const homePageHandler = require('./handlers/homepage-handler')
const staticHandler = require('./handlers/static-handler')
const viewAllHandler = require('./handlers/viewall-handler')
const errorHandler = require('./handlers/error-handler')



http.createServer((request, response) => {

  path = url.parse(request.url).pathname;
  request.path = url.parse(request.url).pathname;
  console.log(request.path);

  let handlers = [
    homePageHandler,
    viewAllHandler,
    staticHandler,
    errorHandler
  ]

  for (const handler of handlers) {

    ;
    if (!handler(request, response)) {
      break;
    }


  }


  // if (path === '/') {

  //   fs.readFile('./views/home.html', (err, data) => {

  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     response.writeHead(200, {
  //       'content-type': 'text/html'
  //     })

  //     response.write(data)
  //     response.end()
  //   })
  // } else if (path === '/public/css/main.css') {

  //   fs.readFile('./public/css/main.css', (err, data) => {

  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     response.writeHead(200, {
  //       'content-type': 'text/css'
  //     })

  //     response.write(data)
  //     response.end()
  //   })
  // } else if (path === '/public/images/favicon.ico') {

  //   fs.readFile('./public/images/favicon.ico', (err, data) => {

  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     response.writeHead(200, {
  //       'content-type': 'image/x-icon'
  //     })

  //     response.write(data)
  //     response.end()
  //   })
  // } else if (path === '/public/images/nodeLogo.png') {

  //   fs.readFile('./public/images/nodeLogo.png', (err, data) => {

  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     response.writeHead(200, {
  //       'content-type': 'image/png'
  //     })

  //     response.write(data)
  //     response.end()
  //   })

  // } else if (path === '/viewAllMovies') {
  //   fs.readFile('./views/viewAll.html', (err, data) => {

  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     response.writeHead(200, {
  //       'content-type': 'text/html'
  //     })

  //     response.write(data)
  //     response.end()
  //   })
  // } else {

  //   fs.readFile(`.${path}`, (err, data) => {
  //     if (err) {
  //       response.writeHead(404)
  //       response.write('404: Not Found')
  //       response.end()
  //       return
  //     }

  //     response.write(data)
  //     response.end()
  //   })

  // }

}).listen(port)

console.log(`Server listening on port ${port}...`)
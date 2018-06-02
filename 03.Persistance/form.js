const http = require('http')
const fs = require('fs')
const port = 4012
let formidable = require('formidable')

http.createServer((request, response) => {
  if (request.method === 'GET') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      }

      response.writeHead(200, {
        'Content-type': 'text/html'
      })
      response.write(data)
      response.end()
    })
  } else {
    var form = new formidable.IncomingForm()

    form.parse(request, function (err, fields, files) {
      if (err) {
        console.log(err)
        return
      }

      console.log(files)
      let fileObject = files.firstfile // imeto na faila daneno mu vav formata
      let tempPath = fileObject.path
      let fileName = fileObject.name

      fs.rename(tempPath, './files/' + fileName, err => {
        if (err) {
          console.log(err)
          return
        }

        response.writeHead(200, {'content-type': 'text/plain'})
        response.write('Uploaded')
        response.end()
      })
    })
  }
}).listen(port)

console.log(`server listening on port ${port}`)

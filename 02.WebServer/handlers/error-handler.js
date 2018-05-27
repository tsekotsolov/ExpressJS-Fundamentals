module.exports = (request, response) => {
  response.writeHead(404)
  response.write('404: Not Found')
  response.end()
  return
}
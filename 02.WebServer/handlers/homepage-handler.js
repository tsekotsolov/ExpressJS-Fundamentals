
module.exports = (request, response) => {
  if (request.path === '/' || request.path === '/home.html') {
    response.writeHtml('./views/home.html')
  } else {
    return true
  }
}

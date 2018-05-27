
module.exports = (request, response) => {
  if (request.path === '/viewAllMovies') {
    response.writeHtml('./views/viewAll.html')
  } else {
    return true
  }
}

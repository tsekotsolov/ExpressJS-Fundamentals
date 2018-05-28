
module.exports = (request, response) => {
  if (request.path === '/viewAllMovies' && request.method ==='GET') {

    response.writeHtml('./views/viewAll.html')
  } else {
    return true
  }
}

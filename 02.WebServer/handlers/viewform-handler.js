
module.exports = (request, response) => {
  if (request.path === '/addMovie'&& request.method ==='GET') {

    response.writeHtml('./views/addMovie.html')

  } else {
    return true
  }
}

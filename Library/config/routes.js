const handlers = require('../handlers')

module.exports = (app) => {
  app.get('/', handlers.homeHandler)

  app.get('/addBook', handlers.addBookHandler.getForm)
  app.post('/addBook', handlers.addBookHandler.postForm)

  app.get('/viewAllBooks', handlers.viewAllHandler)

  app.get('/details', handlers.detailsHandler)
}

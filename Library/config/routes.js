const handlers = require('../handlers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', handlers.homeHandler)

  // authentication for loggeed users auth.isAuthenticated
  // authentication for users with specific role auth.isInRole('Admin')

  app.get('/addBook', auth.isAuthenticated, handlers.addBookHandler.getForm)
  app.post('/addBook', auth.isAuthenticated, handlers.addBookHandler.postForm)

  app.get('/viewAllBooks', handlers.viewAllHandler)

  app.get('/details', handlers.detailsHandler)

  app.get('/register', handlers.usersHandler.registerGet)
  app.post('/register', handlers.usersHandler.registerPost)

  app.post('/logout', handlers.usersHandler.logout)

  app.get('/login', handlers.usersHandler.loginGet)
  app.post('/login', handlers.usersHandler.loginPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 not Found')
  })
}

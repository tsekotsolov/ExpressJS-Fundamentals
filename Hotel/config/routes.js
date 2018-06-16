const handlers = require('../handlers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', handlers.homeHandler)
  app.get('/list', handlers.listHandler)
  app.get('/about', handlers.aboutHandler)

  // authentication for loggeed users auth.isAuthenticated
  // authentication for users with specific role auth.isInRole('Admin')

  app.get('/addHotel', auth.isAuthenticated, handlers.hotelHandler.getForm)
  app.post('/addHotel', handlers.hotelHandler.postForm)

  app.get('/like', auth.isAuthenticated, handlers.hotelHandler.likes)

  app.get('/loginRegister', handlers.usersHandler.registerGet)
  app.post('/register', handlers.usersHandler.registerPost)
  app.post('/logout', handlers.usersHandler.logout)
  app.post('/login', handlers.usersHandler.loginPost)

  app.get('/details', handlers.hotelHandler.details)
  app.post('/comment', handlers.hotelHandler.comment)

  app.get('/addCategories', auth.isInRole('Admin'), handlers.categoryHandler.getForm)
  app.post('/addCategories', auth.isInRole('Admin'), handlers.categoryHandler.postForm)

  app.all('*', (req, res) => {
    res.status(404)
    res.render('error404')
  })
}

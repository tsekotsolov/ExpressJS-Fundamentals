const handlers = require('../handlers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', handlers.homeHandler)

  // authentication for loggeed users auth.isAuthenticated
  // authentication for users with specific role auth.isInRole('Admin')

  app.get('/createArticle', auth.isAuthenticated, handlers.createArticleHandler.getForm)
  app.post('/createArticle', auth.isAuthenticated, handlers.createArticleHandler.postForm)

  app.get('/all-articles', handlers.allArticlesHandler)

  app.get('/article', handlers.singleArticleHandler)

  app.get('/latest-article', handlers.latestAtricleHandler)
  app.get('/history', auth.isAuthenticated, handlers.historyHandler)

  app.get('/edit-history', handlers.editHistoryHandler)

  app.get('/edit', auth.isAuthenticated, handlers.editArticleHandler.editGet)
  app.post('/edit', auth.isAuthenticated, handlers.editArticleHandler.editPost)

  app.get('/lockStatus',auth.isInRole('Admin'), handlers.lockStatusHandler)

  app.get('/register', handlers.usersHandler.registerGet)
  app.post('/register', handlers.usersHandler.registerPost)

  app.post('/logout', handlers.usersHandler.logout)

  app.get('/login', handlers.usersHandler.loginGet)
  app.post('/login', handlers.usersHandler.loginPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.render('error404')
  })
}

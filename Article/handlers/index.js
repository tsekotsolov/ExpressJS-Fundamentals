const homeHandler = require('./homeHandler')
const createArticleHandler = require('./createArticleHandler')
const usersHandler = require('./usersHandler')
const allArticlesHandler = require('./allArticlesHandler')
const singleArticleHandler = require('./singleArticleHandler.js')
const latestAtricleHandler = require('./latestArticleHandler')
const historyHandler = require('./historyHandler')
const editArticleHandler = require('./editArticleHandler')
const editHistoryHandler = require('./editHistoryHandler')
const lockStatusHandler = require('./lockStatusHandler')

module.exports = {
  homeHandler,
  createArticleHandler,
  usersHandler,
  allArticlesHandler,
  singleArticleHandler,
  latestAtricleHandler,
  historyHandler,
  editArticleHandler,
  editHistoryHandler,
  lockStatusHandler
}

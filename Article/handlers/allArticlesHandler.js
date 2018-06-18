let Article = require('../models/ArticleSchema')
module.exports = (req, res) => {
  Article.find({}).then((allArticles) => {
    allArticles = allArticles.sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
    res.render('viewAll', {allArticles})
  })
}

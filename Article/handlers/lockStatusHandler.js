let Article = require('../models/ArticleSchema')

module.exports = (req, res) => {
  let articleId = req.query.id

  Article.findById(articleId).then((foundArticle) => {
    if (foundArticle.lockStatus === true) {
      foundArticle.lockStatus = false
    } else {
      foundArticle.lockStatus = true
    }

    foundArticle.save().then(() => {
      res.redirect('/')
    })
  })
}

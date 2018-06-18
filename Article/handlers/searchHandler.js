let Article = require('../models/ArticleSchema')
module.exports = (req, res) => {
  let keyword = req.body.keyword

  Article.find({}).then((allArticles) => {
    let arrayOfMatches = []

    for (const article of allArticles) {
      if (article.title.includes(keyword)) {
        arrayOfMatches.push(article)
      }
    }
    res.render('search-results', {keyword, arrayOfMatches})
  })
}

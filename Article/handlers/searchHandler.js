let Article = require('../models/ArticleSchema')
module.exports = (req, res) => {
  let keyword = req.body

  console.log(keyword)

  Article.find({}).then((allArticles) => {
    let arrayOfMatches = []

    for (const article of allArticles) {
      if (article.title.includes(keyword.keyword)) {
        arrayOfMatches.push(article)
      }
    }

    console.log(arrayOfMatches)

    res.render('search-results', {keyword, arrayOfMatches})
  })
}

let Article = require('../models/ArticleSchema')
let Edit = require('../models/EditSchema')

module.exports = (req, res) => {
  Article.find({}).then((allArticles) => {
    if (allArticles.length === 0) {
      res.render('home')
      return
    }

    let lastArticle = allArticles.pop()
    let sideArticles = allArticles.slice(-3).reverse()

    let edits = lastArticle.edits
    let editId = edits[0]

    Edit.findById(editId).then((foundEdit) => {
      let content = foundEdit.content.split(' ').splice(0, 50).join(' ')

      let lastArticleToRender = {
        title: lastArticle.title,
        content: content,
        id: lastArticle._id
      }

      res.render('home', {lastArticleToRender, sideArticles})
    })
  })
}

let Article = require('../models/ArticleSchema')
let Edit = require('../models/EditSchema')

module.exports = (req, res) => {
  let articleId = req.query.id

  Article.findById(articleId).then((foundArticle) => {
    let edits = foundArticle.edits
    let editId = edits[0]

    Edit.findById(editId).then((foundId) => {
      let articleToRender = {
        title: foundArticle.title,
        content: foundId.content,
        articleId: articleId
      }
      res.render('singleArticle', articleToRender)
    })
  })
}

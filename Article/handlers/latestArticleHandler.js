let Article = require('../models/ArticleSchema')
let Edit = require('../models/EditSchema')

module.exports = (req, res) => {
  Article.find({}).then((articles) => {
    let foundArticle = articles.pop()

    let edits = foundArticle.edits
    let editId = edits[0]

    Edit.findById(editId).then((foundId) => {
      let articleToRender = {
        title: foundArticle.title,
        content: foundId.content
      }
      res.render('singleArticle', articleToRender)
    })
  })
}

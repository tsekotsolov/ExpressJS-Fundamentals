let Article = require('../models/ArticleSchema')
let Edit = require('../models/EditSchema')

module.exports = (req, res) => {
  let editId = req.query.id

  Edit.findById(editId).then((foundEdit) => {
    let articleId = foundEdit.article

    Article.findById(articleId).then((foundArticle) => {
      let contentToRender = {
        content: foundEdit.content,
        title: foundArticle.title,
        articleId: foundArticle._id

      }
      res.render('historyArticle', {contentToRender})
    })
  })
}

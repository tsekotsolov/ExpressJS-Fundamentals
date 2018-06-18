let Article = require('../models/ArticleSchema')
let Edit = require('../models/EditSchema')

module.exports = (req, res) => {
  let articleId = req.query.id

  Article.findById(articleId).then((foundArticle) => {
    Edit.find({article: {$in: foundArticle._id}}).then((foundEdits) => {
      let edits = []

      for (const edit of foundEdits) {
        let currentEdit = {
          author: edit.author,
          creationDate: edit.creationDate.toUTCString(),
          id: edit._id
        }
        edits.push(currentEdit)
      }

      let article = {
        title: foundArticle.title

      }
      edits = edits.reverse()

      res.render('history', {article, edits})
    })
  })
}

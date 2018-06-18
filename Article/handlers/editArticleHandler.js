let Article = require('../models/ArticleSchema')
let Edit = require('../models/EditSchema')

module.exports = {
  editGet: (req, res) => {
    let articleId = req.query.id

    Article.findById(articleId).then((foundArticle) => {
      let isAdmin = false
      if (req.isAuthenticated() && req.user.roles.indexOf('Admin') > -1) {
        isAdmin = true
      }

      let isLocked = false
      if (foundArticle.lockStatus === true) {
        isLocked = true
      }

      let lastEditId = foundArticle.edits[0]

      Edit.findById(lastEditId).then((foundEdit) => {
        let contentToRender = {
          title: foundArticle.title,
          content: foundEdit.content,
          id: articleId
        }
        res.render('edit', {isLocked, isAdmin, contentToRender})
      })
    })
  },

  editPost: (req, res) => {
    let articleId = req.query.id

    let updatedEdit = {
      author: req.user.username,
      content: req.body.content,
      article: articleId
    }

    Edit.create(updatedEdit).then((createdEdit) => {
      let idToUnshiftInArticleArray = createdEdit._id

      Article.findById(articleId).then((foundArticle) => {
        foundArticle.edits.unshift(idToUnshiftInArticleArray)
        foundArticle.save().then(res.redirect('/'))
      })
    })
  }
}

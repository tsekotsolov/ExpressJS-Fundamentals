const Article = require('../models/ArticleSchema')
const Edit = require('../models/EditSchema.js')

module.exports = {

  getForm: (req, res) => {
    res.render('createArticle')
  },

  postForm: (req, res) => {
    let title = req.body.title

    let article = {
      title
    }

    Article.create(article).then((freshArticle) => {
      let edit = {
        author: req.user.username,
        content: req.body.content,
        article: freshArticle._id
      }

      Edit.create(edit).then((freshEdit) => {
        Article.findById(freshArticle._id).then((foundArticle) => {
          foundArticle.edits.push(freshEdit._id)
          foundArticle.save().then(() => {
            res.redirect('/')
          })
        })
      })
    })
  }
}

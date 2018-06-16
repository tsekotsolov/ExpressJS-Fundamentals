const Category = require('mongoose').model('Category')

module.exports = {

  getForm: (req, res) => {
    res.render('categoryForm')
  },
  postForm: (req, res) => {
    Category.create({
      categoryTitle: req.body.categoryTitle
    }).then((e) => {
      res.redirect('/')
    })
  }}

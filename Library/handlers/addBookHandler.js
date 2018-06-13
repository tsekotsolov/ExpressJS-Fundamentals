const Book = require('../models/BookSchema')

module.exports = {

  getForm: (req, res) => {
    res.render('addBook')
  },

  postForm: (req, res) => {
    Book.create(req.body).then((obj) => {
      res.redirect('addBook')
    })
  }
}

const Book = require('../models/BookSchema')

module.exports = (req, res) => {
  let id = req.query.id
  Book.findById(id).then((book) => {
    res.render('details', book)
  })
}

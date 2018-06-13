let Book = require('../models/BookSchema')
module.exports = (req, res) => {
  Book.find({}).then((allBooks) => {
    let booksCount = allBooks.length
    res.render('home', {booksCount})
  })
}

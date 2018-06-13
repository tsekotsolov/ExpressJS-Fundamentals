let Book = require('../models/BookSchema')
module.exports = (req, res) => {
  Book.find({}).then((allBooks) => {
    allBooks = allBooks.sort((a, b) => {
      return a.bookYear - b.bookYear
    })
    res.render('viewAll', {allBooks})
  })
}

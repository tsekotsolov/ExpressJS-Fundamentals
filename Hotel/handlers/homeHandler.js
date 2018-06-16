let Hotel = require('../models/HotelSchema')
module.exports = (req, res) => {
  Hotel.find({}).limit(20).then((hotels) => {
    hotels = hotels.sort((a, b) => {
      return b.creationDate - a.creationDate
    })
    res.render('home', {hotels})
  })
}

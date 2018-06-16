let Hotel = require('../models/HotelSchema')
module.exports = (req, res) => {
  let page = Number(req.query.page) || 1
  let limit = 3
  Hotel.count({}).then((hotelCount) => {
    let maxPages = Math.ceil(hotelCount / limit)

    if (page > maxPages) {
      page = maxPages
    }
    if (page < 0) {
      page = 0
    }

    let pages = {

      nextPage: page + 1,
      prevPage: page - 1
    }

    Hotel.find({}).skip((page - 1) * limit).limit(limit).then((hotels) => {
      res.render('listHotel', {hotels, pages})
    })
  })
}

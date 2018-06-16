const Hotel = require('../models/HotelSchema')
const Category = require('mongoose').model('Category')

module.exports = {

  getForm: (req, res) => {
    res.render('addHotel')
  },
  postForm: (req, res) => {
    let currentHotel = {
      title: req.body.title,
      location: req.body.location,
      image: req.body.image,
      type: req.body.type,
      description: req.body.description
    }
    Hotel.create(currentHotel).then((obj) => {
      res.locals.successMessage = 'Hotel added'
      res.render('addHotel')
    }).catch((err) => {
      res.locals.globalError = err
      res.render('addHotel')
    })
  },
  details: (req, res) => {
    let id = req.query.id
    Hotel.findById(id).then((selectedHotel) => {
      selectedHotel.views++
      selectedHotel.save()
      res.render('details', {
        selectedHotel
      })
    })
  },
  likes: (req, res) => {
    let currentUserId = req.user._id
    let id = req.query.id

    Hotel.findById(id).then((selectedHotel) => {
      if (selectedHotel.likes.indexOf(currentUserId) < 0) {
        selectedHotel.likes.push(currentUserId)
      } else {
        selectedHotel.likes.splice(selectedHotel.likes.indexOf(currentUserId), 1)
      }
      selectedHotel.save()
      res.render('details', {
        selectedHotel
      })
    })
  },
  comment: (req, res) => {
    let hotelId = req.query.id
    let currentUserId = req.user._id

    let currentComment = {
      title: req.body.title,
      commentText: req.body.commentText,
      author: currentUserId,
      authorName: req.user.username
    }

    Hotel.findById(hotelId).then((selectedHotel) => {
      selectedHotel.comments.unshift(currentComment)
      selectedHotel.save()
      res.render('details', {
        selectedHotel
      })
    })
  }

}

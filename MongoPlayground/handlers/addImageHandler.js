const Image = require('mongoose').model('Image')
const formidable = require('formidable')
const url = require('url')

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}

function addImage (req, res) {
  var form = new formidable.IncomingForm()

  form.parse(req, function (err, fields) {
    if (err) {
      console.log(err)
      return
    }

    let tagArray = fields.tagsID.split(',').filter((v, i, a) => a.indexOf(v) === i)
    tagArray.pop()

    let image = new Image({
      url: fields.imageUrl,
      title: fields.imageTitle,
      description: fields.description,
      tags: tagArray

    })

    image.save((err) => {
      if (err) {
        console.log(err)
        return
      }
      res.writeHead(302, {
        'Location': '/'
      })
      res.end()
    })
  })
}

function deleteImg (req, res) {
  let id = url.parse(req.url).query.slice(3)

  Image.findById(id).then((image) => {
    image.remove((err) => {
      if (err) {
        console.log(err)
        return
      }
      res.writeHead(302, {
        'Location': '/'
      })
      res.end()
    })
  })
}

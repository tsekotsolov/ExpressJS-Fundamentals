const Tag = require('mongoose').model('Tag')
const formidable = require('formidable')

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    var form = new formidable.IncomingForm()

    form.parse(req, function (err, fields) {
      if (err) {
        console.log(err)
        return
      }

      let tagName = fields.tagName
      let tagImages = []
      let tag = new Tag({
        name: tagName,
        images: tagImages
      })
      tag.save((err) => {
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
  } else {
    return true
  }
}

const fs = require('fs')
const dataBase = require('../config/dataBase')
const qs = require('querystring')
const url = require('url')
const formidable = require('formidable')
const shortid = require('shortid')
const http = require('http')

function readFile (path, charset, callback) {
  fs.readFile(path, charset, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    callback(data)
  })
}

function createMeme (id, title, memeSrc, description, privacy) {
  return {
    id: id,
    title: title,
    memeSrc: memeSrc,
    description: description,
    privacy: privacy,
    dateStamp: Date.now()
  }
}

let viewAll = (req, res) => {
  let memes = dataBase.getDb()
    .sort((a, b) => {
      return b.dateStamp - a.dateStamp
    })
    .filter(m => m.privacy === 'on')

  let memesHtml = ''

  for (const meme of memes) {
    memesHtml += `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/>          
  </div>`
  }

  readFile('./views/viewAll.html', 'utf8', (data) => {
    data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', memesHtml)
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(data)
  })
}

let viewAddMeme = (req, res) => {
  readFile('./views/addMeme.html', 'utf8', (data) => {
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    res.end(data)
  })
}

let getDetails = (req, res) => {
  let targetedMemeId = qs.parse(url.parse(req.url).query).id
  let targetedMeme = dataBase.getDb().filter(m => m.id === targetedMemeId)[0]
  let memeHtml = `<div class="content">
  <img src="${targetedMeme.memeSrc}" alt=""/>
  <h3>Title  ${targetedMeme.title}</h3>
  <p> ${targetedMeme.description}</p>
<<<<<<< HEAD
  <button><a href="${targetedMeme.memeSrc}/download">Download Meme</a></button>
=======
  <button><a href="${targetedMeme.memeSrc}">Download Meme</a></button>
>>>>>>> 816d01673b50ec34b212d645ce4573a59e0f1566
  </div>`

  readFile('./views/details.html', 'utf8', (data) => {
    data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', memeHtml)
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    res.end(data)
  })
}

let addMeme = (req, res) => {
  let form = new formidable.IncomingForm()
  let filename = shortid.generate()
  let folder = new Date().toJSON().slice(0, 10)
  let filePath = `./public/memeStorage/${folder}/${filename}.jpg`

  fs.access(`./public/memeStorage/${folder}`, (err) => {
    if (err) {
      fs.mkdirSync(`./public/memeStorage/${folder}`)
    }

    form.on('fileBegin', function (name, file) {
      if (file.name !== '') {
        file.path = filePath
        console.log(file)
      }
    })

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
      }

      if (files.meme.size !== 0 && fields.memeTitle !== '' && fields.memeDescription !== '') {
        let meme = createMeme(filename, fields.memeTitle, filePath, fields.memeDescription, fields.status)
        dataBase.add(meme)
        dataBase.save()
      }
    })

    res.writeHead(302, {
      'Location': '/'
    })
    res.end()
  })
}

let downloadMeme = (req, res) => {
  let path = url.parse(req.url)
  let filename = shortid.generate()

  let file = fs.createWriteStream(`${filename}.jpg`)

  http.get(`http://localhost:2323${path.href.slice(0, -9)}`, function (res) {
    res.pipe(file)
  })

  res.writeHead(302, {
    'Location': '/'
  })
  res.end()
}

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else if (req.pathname.endsWith('download') && req.method === 'GET') {
    downloadMeme(req, res)
  } else {
    return true
  }
}

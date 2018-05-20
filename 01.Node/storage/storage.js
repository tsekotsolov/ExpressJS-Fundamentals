let validate = require('./validate')
const fs = require('fs')
let db = {}

let put = (key, value) => {
  validate.stringChecker(key)

  if (validate.keyExistsChecker(key, db)) {
    throw new Error('The KEY already exists')
  }

  db[key] = value
}

let get = (key) => {
  validate.stringChecker(key)
  if (validate.keyExistsChecker(key, db)) {
    return db[key]
  }
  throw new Error('The KEY does not exists')
}

let update = (key, value) => {
  validate.stringChecker(key)
  if (validate.keyExistsChecker(key, db)) {
    db[key] = value
    return
  }
  throw new Error('The KEY does not exists')
}

let del = (key) => {
  validate.stringChecker(key)
  if (validate.keyExistsChecker(key, db)) {
    delete db[key]
    return
  }
  throw new Error('The KEY does not exists')
}

let clear = () => {
  db = {}
}

let save = () => {
  fs.writeFileSync('data.txt', JSON.stringify(db))
}
let load = () => {
  let info = fs.readFileSync('data.txt', 'utf8')
  db = JSON.parse(info)
}

module.exports = {
  put,
  get,
  update,
  del,
  clear,
  save,
  load
}

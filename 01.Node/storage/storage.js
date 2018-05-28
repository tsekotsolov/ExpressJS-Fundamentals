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

let getAll = () => {
  if (Object.keys(db).length === 0 && db.constructor === Object) {
    return 'Empty database'
  }
  return db
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
  try {
    let data = fs.readFileSync('data.txt', 'utf8')
    db = JSON.parse(data)
  } catch (error) {
    return true
  }
}

module.exports = {
  put,
  get,
  update,
  del,
  clear,
  save,
  load,
  getAll
}

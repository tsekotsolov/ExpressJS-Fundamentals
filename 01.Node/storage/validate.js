
let stringChecker = function (key) {
  if (typeof (key) !== 'string') {
    throw new Error('The KEY must be a string')
  }
}

let keyExistsChecker = function (key, db) {
  if (db.hasOwnProperty(key)) {
    return true
  }
  return false
}
module.exports = {
  stringChecker,
  keyExistsChecker
}

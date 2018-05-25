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

let save = (callback) => {

  fs.writeFileSync('data.txt', JSON.stringify(db),(err)=>{
    if(err){
      console.log(err);
      return;
    }
    callback();
  })
  
}

let load = (callback) => {

 try {
  fs.readFileSync('data.txt', 'utf8',(err,data)=>{

    if(err){
      console.log(err);
      return;
    }
    db = JSON.parse(data)
    callback();
  })
  
 } catch (error) {
  return true;
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
let storage = require('./storage/storage')

storage.put('firstKey', 'firstValue')
storage.put('secondKey', 'secondValue')

console.log(storage.get('secondKey'))
console.log(storage.get('firstKey'))
storage.update('secondKey', 'updatedsecondValue')
console.log(storage.get('secondKey'))
storage.save()
storage.clear()
storage.load()
console.log(storage.get('secondKey'))

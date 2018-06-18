let errBoxLoader = () => {
  let errbox = $('#errBox')
  errbox.css('display', 'block')
  errbox.click(() => { errbox.css('display', 'none') })
}

let succssesBoxLoader = () => {
  let succssesBox = $('#succssesBox')
  succssesBox.css('display', 'block')
  setTimeout(function () {
    succssesBox.css('display', 'none')
  }, 6000)
}

let validate = () => {
  let title = $('#bookTitle').val()
  let year = $('#bookYear').val()
  let link = $('#bookPoster').val()
  let author = $('#bookAuthor').val()

  if (!title || !year || !link || !author) {
    event.preventDefault()
    errBoxLoader()
  } else {
    succssesBoxLoader()
  }
}

class FormatChanger {
  constructor () {
    this.text = ''
    this.xml = ''
  }

  addListener (element) {
    document.querySelector(element).addEventListener('click', function (event) {
      event.preventDefault()
      this.text = document.querySelector('#data').value

      this.controlInput()
    }.bind(this))
  }

  controlInput () {
    if (this.text.length === 0) {
      document.querySelector('#data').placeholder = 'You have to paste your content here.'
    } else {
      this.translateInput()
    }
  }

  translateInput () {
    const rows = this.text.split(/\r?\n/)

    rows.forEach(row => {
      console.log('Rad: ' + row)
    })
  }
}

// Exports
export {
  FormatChanger
}

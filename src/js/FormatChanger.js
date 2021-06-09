import { Family } from './Family.js'
import { Person } from './Person.js'

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
      try {
        this.translateInput()
      } catch (error) {
        const textarea = document.querySelector('#data')

        textarea.value = ''
        textarea.placeholder = error.message
      }
    }
  }

  translateInput () {
    const persons = this.structureInformation()

    if (persons.length > 0) {
      let xml = ''

      xml += '<people>'
      xml += this.drawTreeStructure(persons)
      xml += '</people>'

      this.saveFile(xml)
    } else {
      throw new TypeError('Your data did not include any persons. Try again!')
    }
  }

  splitAndReturnValues (row) {
    return row.split('|')
  }

  structureInformation () {
    const rows = this.text.split(/\r?\n/)
    const persons = []
    let pCounter = -1
    let fCounter = -1
    let state = ''

    rows.forEach(row => {
      const values = this.splitAndReturnValues(row)

      if (values[0] === 'P') {
        pCounter = pCounter + 1
        fCounter = -1
        state = 'P'
        persons.push(new Person(values[1], values[2]))
      } else if (values[0] === 'T') {
        if (state === 'P') {
          persons[pCounter].phone.mobile = values[1]
          persons[pCounter].phone.landline = values[2]
        } else {
          persons[pCounter].family[fCounter].phone.mobile = values[1]
          persons[pCounter].family[fCounter].phone.landline = values[2]
        }
      } else if (values[0] === 'A') {
        if (state === 'P') {
          persons[pCounter].address.street = values[1]
          persons[pCounter].address.zipcode = values[2]
        } else {
          persons[pCounter].family[fCounter].address.street = values[1]
          persons[pCounter].family[fCounter].address.zipcode = values[2]
        }
      } else if (values[0] === 'F') {
        const fam = new Family(values[1], values[2])
        persons[pCounter].family.push(fam)
        state = 'F'
        fCounter = fCounter + 1
      } else {
        throw new TypeError('Your input seems to be invalid.')
      }
    })

    return persons
  }

  drawTreeStructure (object) {
    let xml = ''

    object.forEach(property => {
      if (typeof property !== 'string') {
        xml += '<' + property.constructor.name.toLowerCase() + '>'

        xml += this.iterateProps(property)

        xml += '</' + property.constructor.name.toLowerCase() + '>'
      }
    })

    console.log(xml)
    return xml
  }

  iterateProps (prop) {
    let xml = ''

    if (typeof prop === 'object') {
      for (const key in prop) {
        console.log(prop[key])
        xml += '<' + key + '>'
        xml += '</' + key + '>'
      }
    }

    return xml
  }

  saveFile (xml) {
    const name = 'output.xml'
    const link = document.createElement('a')
    const blob = new window.Blob([xml], { type: 'text/plain' })

    link.setAttribute('href', window.URL.createObjectURL(blob))
    link.setAttribute('download', name)

    link.dataset.downloadurl = ['text/plain', link.download, link.href].join(':')
    link.draggable = true
    link.classList.add('dragout')

    link.click()
  }
}

export {
  FormatChanger
}

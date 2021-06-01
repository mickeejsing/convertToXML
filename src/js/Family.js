import { Address } from './Address.js'
import { Phone } from './Phone.js'

class Family {
  constructor (name, born) {
    this.name = name
    this.born = born
    this.address = new Address()
    this.phone = new Phone()
  }
}

export {
  Family
}

import { Address } from './Address.js'
import { Phone } from './Phone.js'

class Person {
  /**
   * Creates an instance of Person.
   * @param {string} firsname
   * @param {string} lastname
   */
  constructor (firsname, lastname) {
    this.firsname = firsname
    this.lastname = lastname
    this.address = new Address()
    this.phone = new Phone()
    this.family = []
  }
}

export {
  Person
}

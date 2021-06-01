/**
 * Module for User.
 *
 * @module js/User
 * @author Mikael Eriksson
 * @version 1.1.0
 */

/**
 * Represents a user.
 *
 * @class User
 */
class User {
/**
 * Creates an instance of User.
 * @param {String} name - The name of the user.
 * @memberof User
 */
  constructor (name) {
    this.name = name
    this.time = 0
  }
}

// Exports
export {
  User
}

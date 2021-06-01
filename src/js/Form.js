/**
 * Module for Form.
 *
 * @module js/Form
 * @author Mikael Eriksson
 * @version 1.1.0
 */

// Imports
import { Quiz } from './Quiz.js'
import { Style } from './Style.js'
import { User } from './User.js'

const quiz = new Quiz()
const changeStyle = new Style()

/**
 * Adds EventListeners to the main form. Saves user in localStorage.
 *
 * @class Form
 */
class Form {
  addListening () {
    const input = document.querySelector('input[type="text"]')
    const submit = document.querySelector('#send')
    submit.disabled = true

    input.addEventListener('input', function () {
      if (input.value.length > 0) {
        changeStyle.unlocked('input[type="submit"]')
      } else {
        changeStyle.locked('input[type="submit"]')
      }
    })

    submit.addEventListener('click', function (event) {
      event.preventDefault()

      let user = new User(input.value)
      user = JSON.stringify(user)

      const lengtOfLocalStorage = window.localStorage.length + 1
      const reff = 'user' + lengtOfLocalStorage

      window.localStorage.setItem(reff, user)
      quiz.start(reff)
    })
  }
}

// Exports
export {
  Form
}

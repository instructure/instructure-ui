import findDOMNode from './findDOMNode'
import findTabbable from './findTabbable'
import ownerDocument from './ownerDocument'
import ownerWindow from './ownerWindow'
import getActiveElement from './getActiveElement'
import addEventListener from './addEventListener'
import containsActiveElement from './containsActiveElement'
import warning from '../warning'

/**
 * ---
 * category: utilities/DOM
 * ---
 * @module FocusManager
 * Class for focus operations.
 * - Scoping focus within a given context,
 * - Mark active element for focus later
 * - Return focus to the marked element
 */
class FocusManager {
  contextElement = null
  focusLaterElement = null
  needToFocus = false
  listeners = []
  timeouts = []

  handleBlur = event => {
    this.needToFocus = true
  }

  handleFocus = event => {
    if (this.needToFocus) {
      this.needToFocus = false

      if (!this.contextElement) {
        return
      }

      // need to see how jQuery shims document.on('focusin') so we don't need the
      // setTimeout, firefox doesn't support focusin, if it did, we could focus
      // the element outside of a setTimeout. Side-effect of this implementation
      // is that the document.body gets focus, and then we focus our element right
      // after, seems fine.
      this.timeouts.push(
        setTimeout(() => {
          if (containsActiveElement(this.contextElement)) {
            return
          }

          const el = findTabbable(this.contextElement)[0]

          el.focus()
        }, 0)
      )
    }
  }

  markForFocusLater () {
    this.focusLaterElement = getActiveElement(ownerDocument(this.contextElement))
  }

  returnFocus () {
    try {
      this.focusLaterElement.focus()
    } catch (e) {
      warning(
        false,
        `
        You tried to return focus to ${this.focusLaterElement}
        but it is not in the DOM anymore: ${e}
        `
      )
    }
    this.focusLaterElement = null
  }

  setupScopedFocus (el) {
    if (this.contextElement) {
      warning(
        false,
        `
        Focus is already scoped to ${this.contextElement}.
        `
      )
      return
    }
    this.contextElement = findDOMNode(el)
    const win = ownerWindow(this.contextElement)
    this.listeners.push(addEventListener(ownerWindow(this.contextElement), 'blur', this.handleBlur, false))
    this.listeners.push(addEventListener(ownerDocument(this.contextElement), 'focus', this.handleFocus, true))
  }

  teardownScopedFocus () {
    this.listeners.forEach(listener => {
      listener.remove()
    })
    this.listeners = []

    this.timeouts.forEach(timeout => {
      clearTimeout(timeout)
    })
    this.timeouts = []
    this.contextElement = null
  }
}

export default FocusManager

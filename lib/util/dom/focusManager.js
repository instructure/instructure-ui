import findDOMNode from './findDOMNode'
import findTabbable from './findTabbable'
import ownerDocument from './ownerDocument'
import ownerWindow from './ownerWindow'
import getActiveElement from './getActiveElement'
import addEventListener from './addEventListener'
import containsActiveElement from './containsActiveElement'

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
      // eslint-disable-next-line
      console.warn(
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
      // eslint-disable-next-line
      console.warn(
        `
        Focus is already scoped to ${this.contextElement}.
        `
      )
      return
    }
    this.contextElement = findDOMNode(el)

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

export default new FocusManager()

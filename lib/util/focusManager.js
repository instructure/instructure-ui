import findTabbable from './findTabbable'

let contextElement = null
let focusLaterElement = null
let needToFocus = false

function handleBlur (event) {
  needToFocus = true
}

function handleFocus (event) {
  if (needToFocus) {
    needToFocus = false

    if (!contextElement) {
      return
    }

    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(() => {
      if (contextElement.contains(document.activeElement)) {
        return
      }

      const el = (findTabbable(contextElement)[0] || contextElement)
      el.focus()
    }, 0)
  }
}

export default {
  markForFocusLater () {
    focusLaterElement = document.activeElement
  },

  returnFocus () {
    try {
      focusLaterElement.focus()
    } catch (e) {
      // eslint-disable-next-line
      console.warn('You tried to return focus to ' + focusLaterElement + ' but it is not in the DOM anymore')
    }
    focusLaterElement = null
  },

  setupScopedFocus (element) {
    contextElement = element

    if (window.addEventListener) {
      window.addEventListener('blur', handleBlur, false)
      document.addEventListener('focus', handleFocus, true)
    } else {
      window.attachEvent('onBlur', handleBlur)
      document.attachEvent('onFocus', handleFocus)
    }
  },

  teardownScopedFocus () {
    contextElement = null

    if (window.addEventListener) {
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('focus', handleFocus)
    } else {
      window.detachEvent('onBlur', handleBlur)
      document.detachEvent('onFocus', handleFocus)
    }
  }
}

import findDOMNode from './findDOMNode'
import findTabbable from './findTabbable'
import isActiveElement from './isActiveElement'
import containsActiveElement from './containsActiveElement'
import getActiveElement from './getActiveElement'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Scope tab in order to trap focus within a specified
 * element.
 *
 * @param {ReactElement|DOMNode} el
 * @param {Event} event the DOM Event that was fired
 */
export default function scopeTab (element, event) {
  const node = findDOMNode(element)
  const tabbable = findTabbable(node)

  if (!tabbable.length) {
    event.preventDefault()
    return
  }

  // Account for a changing tabindex of the active element
  // (a case that happens with Menu for KO a11y)
  if (containsActiveElement(element)) {
    const activeElement = getActiveElement()
    if (tabbable.indexOf(activeElement) === -1) {
      tabbable.push(activeElement)
    }
  }

  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1]
  const leavingFinalTabbable = (
    isActiveElement(finalTabbable) ||
    // handle immediate shift+tab after opening with mouse
    isActiveElement(node)
  )

  if (!leavingFinalTabbable) return

  event.preventDefault()
  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0]
  target.focus()
}

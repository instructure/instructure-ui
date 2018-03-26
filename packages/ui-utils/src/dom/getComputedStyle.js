import findDOMNode from './findDOMNode'
import ownerWindow from './ownerWindow'
import canUseDOM from './canUseDOM'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Get the associated CSS properties and values for a
 * specified element
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {Object} object containing css properties and values for the element
 */
export default function getComputedStyle (el) {
  let style = {}

  if (canUseDOM) {
    const node = el && findDOMNode(el)
    style = node ? ownerWindow(el).getComputedStyle(node) : {}
  }

  return style
}

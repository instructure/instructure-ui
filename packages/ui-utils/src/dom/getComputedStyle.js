import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Get the associated css properties and values for a
 * specified element
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {Object} object containing css properties and values for the element
 */
export default function getComputedStyle (el) {
  let style = {}

  if (canUseDOM) {
    const node = el && findDOMNode(el)
    style = node ? window.getComputedStyle(node) : {}
  }

  return style
}

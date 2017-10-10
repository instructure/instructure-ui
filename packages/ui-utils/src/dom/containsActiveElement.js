import findDOMNode from './findDOMNode'
import getActiveElement from './getActiveElement'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Determine if an element contains the active element
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {boolean} if the element contains the active element
 */
export default function containsActiveElement (el) {
  const node = el && findDOMNode(el)
  const active = getActiveElement()
  return (node && (active === node || node.contains(active)))
}

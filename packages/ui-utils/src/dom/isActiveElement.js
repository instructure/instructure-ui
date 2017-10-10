import findDOMNode from './findDOMNode'
import getActiveElement from './getActiveElement'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Determine if an element is the active element
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {boolean} if the element is the active element
 */
export default function isActiveElement (el) {
  const node = el && findDOMNode(el)
  return (node && getActiveElement() === node)
}

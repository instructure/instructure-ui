import findDOMNode from './findDOMNode'
import ownerDocument from './ownerDocument'

/**
 * ---
 * category: utilities/DOM
 * ---
 * Retrieve the owner window object associated with
 * the owner document of the specified element
 * @param {ReactElement|DOMNode} el
 * @returns {Object} the owner window
 */
export default function (el) {
  const node = el && findDOMNode(el)
  const doc = ownerDocument(node)
  return doc && (doc.defaultView || doc.parentWindow)
}

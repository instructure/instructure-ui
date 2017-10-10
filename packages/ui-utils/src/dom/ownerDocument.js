import findDOMNode from './findDOMNode'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Retrieve the owner document of a specified element
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {DomNode} the owner document
 */
export default function ownerDocument (el) {
  const node = el && findDOMNode(el)
  return (node && node.ownerDocument) || document
}

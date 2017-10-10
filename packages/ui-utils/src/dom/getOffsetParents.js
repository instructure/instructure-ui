import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'
import getComputedStyle from './getComputedStyle'
import ownerDocument from './ownerDocument'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Retrieves the offset parents of a specified element.
 * Includes parents of nodeType 1 (Element nodes such
 * as <p> or <div>) that do not have static position.
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {Array} offset parents
 */
export default function getOffsetParents (el) {
  const parents = []

  if (!canUseDOM) {
    return parents
  }

  const node = findDOMNode(el)

  if (node) {
    let parent = node

    while ((parent = parent.parentNode) && parent && parent.nodeType === 1 && parent.tagName !== 'BODY') {
      if (getComputedStyle(parent).position !== 'static') {
        parents.push(parent)
      }
    }

    parents.push(ownerDocument(node).body)
  }

  return parents
}

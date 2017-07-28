import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'
import getComputedStyle from './getComputedStyle'
import ownerDocument from './ownerDocument'

export default function getOffsetParents (el) {
  const parents = []

  if (!canUseDOM) {
    return parents
  }

  const node = findDOMNode(el)

  let parent = node

  while ((parent = parent.parentNode) && parent && parent.nodeType === 1 && parent.tagName !== 'BODY') {
    if (getComputedStyle(parent).position !== 'static') {
      parents.push(parent)
    }
  }

  parents.push(ownerDocument(node).body)

  return parents
}

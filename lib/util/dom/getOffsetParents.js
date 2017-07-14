import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'
import getComputedStyle from './getComputedStyle'

export default function getOffsetParents (el) {
  const parents = []

  if (!canUseDOM) {
    return parents
  }

  const node = findDOMNode(el)

  let parent = node

  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    if (getComputedStyle(parent).position !== 'static') {
      parents.push(parent)
    }
  }

  parents.push(node.ownerDocument.body)

  return parents
}

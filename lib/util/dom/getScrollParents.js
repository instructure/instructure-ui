import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'
import getComputedStyle from './getComputedStyle'

export default function getScrollParents (el) {
  const parents = []

  if (!canUseDOM) {
    return parents
  }

  const node = findDOMNode(el)

  // In firefox if the element is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  const computedStyle = getComputedStyle(node) || {}
  const position = computedStyle.position

  if (position === 'fixed') {
    return [node.ownerDocument]
  }

  let parent = node
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    let style
    try {
      style = getComputedStyle(parent)
    } catch (err) {} // eslint-disable-line no-empty

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent)
      return parents
    }

    const {overflow, overflowX, overflowY} = style

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent)
      }
    }
  }

  parents.push(node.ownerDocument.body)

  // If the node is within a frame, account for the parent window scroll
  if (node.ownerDocument !== document) {
    parents.push(node.ownerDocument.defaultView)
  }

  return parents
}

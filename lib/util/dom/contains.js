import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'

export default canUseDOM ? contains : fallback

function contains (context, el) {
  const container = findDOMNode(context)
  const node = findDOMNode(el)

  if (!container || !node) {
    return false
  } else if (container.contains) {
    return container.contains(node)
  } else if (container.compareDocumentPosition) {
    return container === node || !!(container.compareDocumentPosition(node) & 16) // eslint-disable-line no-bitwise
  } else {
    return fallback(container, node)
  }
}

/* istanbul ignore next  */
function fallback (context, el) {
  let node = el

  while (node) {
    if (node === context) {
      return true
    }
    node = node.parentNode
  }

  return false
}

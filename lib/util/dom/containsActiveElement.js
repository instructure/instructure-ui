import findDOMNode from './findDOMNode'
import getActiveElement from './getActiveElement'

export default function containsActiveElement (el) {
  const node = el && findDOMNode(el)
  const active = getActiveElement()
  return (node && (active === node || node.contains(active)))
}

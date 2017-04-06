import findDOMNode from './findDOMNode'
import getActiveElement from './getActiveElement'

export default function isActiveElement (el) {
  const node = el && findDOMNode(el)
  return (node && getActiveElement() === node)
}

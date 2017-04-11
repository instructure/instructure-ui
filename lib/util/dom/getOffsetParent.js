import findDOMNode from './findDOMNode'

export default function getOffsetParent (el) {
  const node = findDOMNode(el)
  return node.offsetParent || document.documentElement
}

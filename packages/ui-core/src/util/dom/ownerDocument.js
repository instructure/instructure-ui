import findDOMNode from './findDOMNode'

export default function ownerDocument (el) {
  const node = el && findDOMNode(el)
  return (node && node.ownerDocument) || document
}

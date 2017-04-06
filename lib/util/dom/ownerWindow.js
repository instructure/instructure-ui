import findDOMNode from './findDOMNode'
import ownerDocument from './ownerDocument'

export default function (el) {
  const node = el && findDOMNode(el)
  const doc = ownerDocument(node)
  return doc && (doc.defaultView || doc.parentWindow)
}

import findDOMNode from './findDOMNode'

export default function addEventListener (el, event, handler, capture) {
  const node = (el === window || el === document) ? el : findDOMNode(el)
  node.addEventListener(event, handler, capture)

  return {
    remove () {
      node.removeEventListener(event, handler, capture)
    }
  }
}

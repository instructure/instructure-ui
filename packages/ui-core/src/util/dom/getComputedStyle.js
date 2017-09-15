import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'

export default function getComputedStyle (el) {
  let style = {}

  if (canUseDOM) {
    const node = el && findDOMNode(el)
    style = node ? window.getComputedStyle(node) : {}
  }

  return style
}

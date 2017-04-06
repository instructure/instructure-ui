import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'
import contains from './contains'

export default function getBoundingClientRect (el) {
  const rect = { top: 0, left: 0, height: 0, width: 0 }

  if (!canUseDOM) {
    return rect
  }

  const node = findDOMNode(el)

  if (!node) {
    return rect
  }

  const doc = (el === document) ? document : node.ownerDocument
  const docEl = doc && doc.documentElement

  if (!docEl || !contains(docEl, node)) {
    return rect
  }

  const boundingRect = node.getBoundingClientRect()

  let k

  for (k in boundingRect) {
    rect[k] = boundingRect[k]
  }

  if (doc !== document) {
    const frameElement = doc.defaultView.frameElement
    if (frameElement) {
      const frameRect = getBoundingClientRect(frameElement)
      rect.top += frameRect.top
      rect.bottom += frameRect.top
      rect.left += frameRect.left
      rect.right += frameRect.left
    }
  }

  return {
    top: rect.top + (window.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0),
    left: rect.left + (window.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0),
    width: (rect.width == null ? node.offsetWidth : rect.width) || 0,
    height: (rect.height == null ? node.offsetHeight : rect.height) || 0,
    right: doc.body.clientWidth - rect.width - rect.left,
    bottom: doc.body.clientHeight - rect.height - rect.top
  }
}

import findDOMNode from './findDOMNode'
import canUseDOM from './canUseDOM'
import contains from './contains'
import ownerDocument from './ownerDocument'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Gets the bounding rectangle of an element
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @return {object} rect - object with top, left coords and height and width
 */
export default function getBoundingClientRect (el) {
  const rect = { top: 0, left: 0, height: 0, width: 0 }

  if (!canUseDOM) {
    return rect
  }

  const node = findDOMNode(el)

  if (!node) {
    return rect
  }

  if (node === window) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset,
      width: window.innerWidth,
      height: window.innerHeight,
      right: window.innerWidth + window.pageXOffset,
      bottom: window.innerHeight + window.pageYOffset
    }
  }

  const doc = el === document ? document : ownerDocument(node)
  const docEl = doc && doc.documentElement

  if (!docEl || !contains(docEl, node)) {
    return rect
  }

  const boundingRect = node.getBoundingClientRect()

  let k

  // eslint-disable-next-line no-restricted-syntax
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

  /* eslint-disable no-mixed-operators */
  return {
    top: rect.top + (window.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0),
    left: rect.left + (window.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0),
    width: (rect.width == null ? node.offsetWidth : rect.width) || 0,
    height: (rect.height == null ? node.offsetHeight : rect.height) || 0,
    right: doc.body.clientWidth - rect.width - rect.left,
    bottom: doc.body.clientHeight - rect.height - rect.top
  }
  /* eslint-enable no-mixed-operators */
}

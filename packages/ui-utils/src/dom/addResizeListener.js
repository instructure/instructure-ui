import findDOMNode from './findDOMNode'
import requestAnimationFrame from './requestAnimationFrame'

// TODO: replace with https://wicg.github.io/ResizeObserver/ when it's supported

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Adds a listener to an element and calls a specified handler
 * function whenever the size changes
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @param {function} handler - function to run when resize occurs
 * @returns {function} remove - cancel the listener and no longer execute the handler function
 */
export default function addResizeListener (el, handler) {
  const node = findDOMNode(el)
  let width = node.offsetWidth
  let cancelled = false
  let raf

  const checkDimensions = () => {
    if (cancelled) {
      return
    }

    const size = {
      width: node.offsetWidth,
      height: node.offsetHeight
    }

    if (size.width !== width && typeof handler === 'function') {
      handler(size)
    }

    width = size.width

    raf = requestAnimationFrame(checkDimensions)
  }

  checkDimensions()

  return {
    remove () {
      cancelled = true
      raf.cancel()
    }
  }
}

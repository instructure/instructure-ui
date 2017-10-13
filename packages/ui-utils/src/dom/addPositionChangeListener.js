import findDOMNode from './findDOMNode'
import getBoundingClientRect from './getBoundingClientRect'
import requestAnimationFrame from './requestAnimationFrame'

/**
 * ---
 * category: utilities/DOM
 * ---
 * Adds a listener to an element and calls a specified handler
 * function whenever the position changes
 * @module
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @param {function} handler - function to run if the position has changed
 * @returns {function} remove - cancel the listener and no longer execute the handler function
 */
export default function addPositionChangeListener (el, handler) {
  const node = findDOMNode(el)
  const raf = []

  let coords = getBoundingClientRect(node) || {}
  let cancelled = false

  function checkPosition () {
    if (cancelled === false) {
      const newCoords = getBoundingClientRect(node) || {}
      const positionChanged =
        newCoords.top !== coords.top ||
        newCoords.left !== coords.left ||
        newCoords.right !== coords.right ||
        newCoords.bottom !== coords.bottom ||
        newCoords.width !== coords.width ||
        newCoords.height !== coords.height

      if (positionChanged && typeof handler === 'function') {
        handler(newCoords)
      }

      coords = newCoords

      raf.push(requestAnimationFrame(checkPosition))
    }
  }

  checkPosition()

  return {
    remove () {
      cancelled = true
      raf.forEach(req => req.cancel())
    }
  }
}

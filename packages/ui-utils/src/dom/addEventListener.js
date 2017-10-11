import findDOMNode from './findDOMNode'

/**
 * ---
 * category: utilities/DOM
 * ---
 * Wrapper function for DOM addEventListener
 * @module addEventListener
 * @param {DOMNode} el - DOM node which will have the event listener attached
 * @param {String} event - a string specifying the event name ('click', 'focus', etc)
 * @param {Function} handler - function to run when event occurs
 * @param {Boolean} capture - should the event be executed in the capturing or bubbling phase
 * @returns {Function} a method to remove the event listener
 */
export default function addEventListener (el, event, handler, capture) {
  const node = (el === window || el === document) ? el : findDOMNode(el)
  node.addEventListener(event, handler, capture)

  return {
    remove () {
      node.removeEventListener(event, handler, capture)
    }
  }
}

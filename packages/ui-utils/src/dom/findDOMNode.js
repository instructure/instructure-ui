import ReactDOM from 'react-dom'

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Wrapper function for React.findDOMNode
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {DomNode} The root node of this element
 */
export default function findDOMNode (el) {
  if (el === window) {
    return el
  } else if (el === document) {
    return document.documentElement
  } else if (el) {
    return ReactDOM.findDOMNode(el) // eslint-disable-line react/no-find-dom-node
  }
}

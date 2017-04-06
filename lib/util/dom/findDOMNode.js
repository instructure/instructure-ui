import ReactDOM from 'react-dom'

export default function findDOMNode (el) {
  if (el === window) {
    return el
  } else if (el === document) {
    return document.documentElement
  } else if (el) {
    return ReactDOM.findDOMNode(el)
  }
}

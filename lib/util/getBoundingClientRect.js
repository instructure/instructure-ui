import ReactDOM from 'react-dom'

export default function getBoundingClientRect (componentOrElement) {
  const el = ReactDOM.findDOMNode(componentOrElement)

  if (!el) {
    return
  }

  return el.getBoundingClientRect()
}

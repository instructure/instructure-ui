export default function getFontSize (el) {
  const m = document.createElement('div')

  let container = el || document.body
  let fontSize = 16

  if (!container) {
    container = document.createElement('body')
    container.style.cssText = 'font-size:1em !important'
    document.documentElement.insertBefore(container, document.body)
  }

  m.style.cssText = [
    'display: inline-block !important;',
    'padding: 0 !important;',
    'line-height: 1 !important;',
    'position: absolute !important;',
    'visibility: hidden !important;',
    'font-size: 1em !important;'
  ].join('')
  m.appendChild(document.createTextNode('M'))
  container.appendChild(m)
  fontSize = m.offsetHeight
  container.removeChild(m)

  return fontSize
}

export default function getDefaultFontSize () {
  const temp = document.createElement('div')
  temp.style.cssText = [
    'display: inline-block;',
    'padding: 0;',
    'line-height: 1;',
    'position: absolute;',
    'visibility: hidden;',
    'font-size: 1em'
  ].join('')
  temp.appendChild(document.createTextNode('M'))
  document.body.appendChild(temp)
  const fontSize = temp.offsetHeight
  document.body.removeChild(temp)
  return fontSize
}

import React from 'react'

function placeholderImage (width, height) {
  const iconSVG = require('!!raw!./placeholder.svg')

  width = width || 512
  height = height || 512

  const dataUri = encodeURIComponent(iconSVG.replace(/{{w}}/g, width).replace(/{{h}}/g, height).trim())
  return 'data:image/svg+xml;utf-8,' + dataUri
}

export default function (components) {
  // These need to be globals to render examples
  global['placeholderImage'] = placeholderImage
  global.React = React
  components.forEach((component) => {
    global[component.name] = component.module
  })
}

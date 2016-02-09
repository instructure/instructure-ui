export default function placeholderImage (width = 512, height = 512) {
  const iconSVG = require('!!raw!../images/placeholder.svg')

  // We need to base64 encode this because otherwise FF will add extra escape chars
  const dataUri = btoa(iconSVG.replace(/{{w}}/g, width).replace(/{{h}}/g, height).trim())
  return 'data:image/svg+xml;base64,' + dataUri
}

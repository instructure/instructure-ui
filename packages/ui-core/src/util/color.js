import Color from 'tinycolor2'

export function alpha (color, percent) {
  return Color(color).setAlpha(percent / 100).toRgbString()
}

export function darken (color, percent) {
  return Color(color).darken(percent).toRgbString()
}

export function lighten (color, percent) {
  return Color(color).lighten(percent).toRgbString()
}

export function contrast (color1, color2) {
  return Color.readability(color1, color2)
}

export function isValid (color) {
  return Color(color).isValid()
}

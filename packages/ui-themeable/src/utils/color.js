/**
 * ---
 * category: utilities/themes
 * ---
 * Color utilities
 * @module color
 */
import Color from 'tinycolor2'

/**
 * Adjust the alpha transparency of a color
 * @param {String} color
 * @param {Number} percent
 * @returns {String} color as rgb string
 */
export function alpha (color, percent) {
  return Color(color).setAlpha(percent / 100).toRgbString()
}

/**
 * darken a color
 * @param {String} color
 * @param {Number} percent
 * @returns {String} color as rgb string
 */
export function darken (color, percent) {
  return Color(color).darken(percent).toRgbString()
}

/**
 * lighten a color
 * @param {String} color
 * @param {Number} percent
 * @returns {String} color as rgb string
 */
export function lighten (color, percent) {
  return Color(color).lighten(percent).toRgbString()
}

/**
 * check the contrast ratio of 2 colors
 * @param {String} color1
 * @param {String} color2
 * @returns {Number} color contrast ratio
 */
export function contrast (color1, color2) {
  return Color.readability(color1, color2)
}

/**
 * check if a string is a valid color
 * @param {String} color
 * @returns {Boolean} true if the string is a valid color
 */
export function isValid (color) {
  return Color(color).isValid()
}

import getFontSize from './dom/getFontSize'
import parseUnit from './parseUnit'

/**
 * ---
 * category: utilities
 * ---
 * Converts a unit value size combination (em, rem, px) to a number representing px
 *
 * Example inputs:
 *  - '100rem'
 *  - '20em'
 *  - '40px'
 *
 * @module px
 *
 * @param {String} val
 * @param {DomNode} el - containing element, for context measure is em (defaults to document.body)
 * @returns {Number} Returns numerical representation of pixels
*/
export default function px (val, el) {
  const container = el || document.body

  if (!val || typeof val === 'number') {
    return val
  }

  const [ num, unit ] = parseUnit(val)

  if (unit === 'rem') {
    return num * getFontSize()
  } else if (unit === 'em') {
    return num * getFontSize(container)
  } else {
    return num
  }
}

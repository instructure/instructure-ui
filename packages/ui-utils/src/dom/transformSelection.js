/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * transformCursor - Calculate the resulting cursor position
 * within a string when some characters are removed
 *
 * @param {number} cursorIndex - original cursor index
 * @param {string} dirtyValue - original string
 * @param {string} cleanedValue - original string with some characters removed
 * @returns {number} resulting cursor index
 */
export function transformCursor (cursorIndex, dirtyValue, cleanedValue) {
  if (dirtyValue.length === cleanedValue.length) {
    return cursorIndex
  }
  if (cursorIndex === 0) {
    return 0
  }
  if (cursorIndex === dirtyValue.length) {
    return cleanedValue.length
  }

  return dirtyValue
    .split('')
    .slice(0, cursorIndex)
    .reduce((result, value) => {
      if (value === cleanedValue[result]) {
        return result + 1
      }
      return result
    }, 0)
}

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * transformSelection - Calculate the resulting text selection
 * of a changing text-containing HTML element
 *
 * @param {DomNode} element - HTML element with selection capabilities
 * @param {string} cleanedValue - new value that will be given to the HTML element
 * @return {Object} resulting selection values
 */
export default function transformSelection (element, cleanedValue) {
  const {
    selectionStart,
    selectionEnd,
    selectionDirection,
    value
  } = element

  return {
    selectionStart: transformCursor(selectionStart, value, cleanedValue),
    selectionEnd: transformCursor(selectionEnd, value, cleanedValue),
    selectionDirection
  }
}

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformCursor = transformCursor;
exports.default = transformSelection;
/**
 * transformCursor - Calculate the resulting cursor position
 * within a string when some characters are removed
 *
 * @param  {number} cursorIndex  original cursor index
 * @param  {string} dirtyValue   original string
 * @param  {string} cleanedValue original string with some characters removed
 * @return {number}              resulting cursor index
 */
function transformCursor(cursorIndex, dirtyValue, cleanedValue) {
  if (dirtyValue.length === cleanedValue.length) {
    return cursorIndex;
  }
  if (cursorIndex === 0) {
    return 0;
  }
  if (cursorIndex === dirtyValue.length) {
    return cleanedValue.length;
  }

  return dirtyValue.split('').slice(0, cursorIndex).reduce(function (result, value) {
    if (value === cleanedValue[result]) {
      return result + 1;
    }
    return result;
  }, 0);
}

/**
 * transformSelection - Calculate the resulting text selection
 * of a changing text-containing HTML element
 *
 * @param  {DomNode} element      HTML element with selection capabilities
 * @param  {string} cleanedValue  new value that will be given to the HTML element
 * @return {Object}               resulting selection values
 */
function transformSelection(element, cleanedValue) {
  var selectionStart = element.selectionStart,
      selectionEnd = element.selectionEnd,
      selectionDirection = element.selectionDirection,
      value = element.value;


  return {
    selectionStart: transformCursor(selectionStart, value, cleanedValue),
    selectionEnd: transformCursor(selectionEnd, value, cleanedValue),
    selectionDirection: selectionDirection
  };
}
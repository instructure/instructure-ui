/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { cloneArray } from '@instructure/ui-utils'

/**
 * ---
 * parent: TruncateText
 * private: true
 * ---
 * Removes given characters, such as whitespace and punctuation, from stringData
 * arrays used by Truncator and TruncateText.
 *
 * @param {Array} stringData A stringData array.
 * @param {Object} options The options object.
 * @param {string} options.truncate Is the data being truncated by character or word.
 * @param {string[]} options.ignore An array of characters to remove around the ellipsis.
 * @param {string} options.ellipsis The string being used as an ellipsis.
 * @param {boolean} repeat=false Do a thorough clean.
 */
function cleanData(stringData, options, repeat = false) {
  const { truncate, ignore, ellipsis } = options

  let newData = cloneArray(stringData)
  let ellipsisNode = -1
  let ellipsisIndex = -1

  const findEllipsis = () => {
    for (let i = 0; i < newData.length; i++) {
      const nodeData = newData[i]
      if (nodeData.indexOf(ellipsis) !== -1) {
        ellipsisNode = i
        ellipsisIndex = nodeData.indexOf(ellipsis)
      }
    }
  }

  if (truncate === 'character') {
    findEllipsis()

    let node = newData[ellipsisNode]

    if (node) {
      const before = node[ellipsisIndex - 1]
      if (before && ignore.indexOf(before) !== -1) {
        // remove character immediately BEFORE the ellipsis in the same node
        newData[ellipsisNode].splice(ellipsisIndex - 1, 1)
      }

      if (!before) {
        // character before the ellipsis is part of a different node
        // find the next node with data and remove last datum
        let prevNode = null
        let prevNodeIndex = ellipsisNode - 1
        while (prevNodeIndex >= 0) {
          prevNode = newData[prevNodeIndex]
          if (prevNode.length > 0) {
            break
          } else {
            prevNodeIndex--
          }
        }

        if (prevNode) {
          const lastChar = String(prevNode.slice(-1))
          if (ignore.indexOf(lastChar) !== -1) {
            newData[prevNodeIndex].length -= 1
          }
        }
      }
    }

    findEllipsis()

    node = newData[ellipsisNode]

    if (node) {
      const after = node[ellipsisIndex + 1]
      if (after && ignore.indexOf(after) !== -1) {
        // remove character immediately AFTER the ellipsis in the same node
        newData[ellipsisNode].splice(ellipsisIndex + 1, 1)
      }

      if (!after) {
        // character after the ellipsis is part of a different node
        // find the next node with data and remove first datum
        let nextNode = null
        let nextNodeIndex = ellipsisNode + 1
        while (nextNodeIndex < newData.length) {
          nextNode = newData[nextNodeIndex]
          if (nextNode.length > 0) {
            break
          } else {
            nextNodeIndex++
          }
        }
        if (nextNode) {
          const firstChar = String(nextNode[0])
          if (ignore.indexOf(firstChar) !== -1) {
            newData[nextNodeIndex].shift()
          }
        }
      }
    }
  } else {
    findEllipsis()

    let node = newData[ellipsisNode]

    if (node) {
      const before = node[ellipsisIndex - 1]
      if (before && ignore.indexOf(before.slice(-1)) !== -1) {
        if (before.length === 1) {
          // remove entire word datum
          newData[ellipsisNode].splice([ellipsisIndex - 1], 1)
        } else {
          // remove word immediately BEFORE the ellipsis in the same node
          newData[ellipsisNode][ellipsisIndex - 1] = before.slice(0, -1)
        }
      }

      if (!before) {
        // word before the ellipsis is part of a different node
        // find the next node with data and remove last datum
        let prevNode = null
        let prevNodeIndex = ellipsisNode - 1
        while (prevNodeIndex >= 0) {
          prevNode = newData[prevNodeIndex]
          if (prevNode.length > 0) {
            break
          } else {
            prevNodeIndex--
          }
        }

        if (prevNode) {
          const lastChar = String(prevNode.slice(-1)).slice(-1)
          if (ignore.indexOf(lastChar) !== -1) {
            let lastItem = prevNode.length - 1
            newData[prevNodeIndex][lastItem] = prevNode[lastItem].slice(0, -1)
          }
        }
      }
    }
  }

  if (repeat) {
    newData = cleanData(newData, options, false)
  }

  return newData
}

export default cleanData

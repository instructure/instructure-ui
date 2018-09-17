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

import escapeHtml from 'escape-html'

import cloneArray from '@instructure/ui-utils/lib/cloneArray'
import warning from '@instructure/ui-utils/lib/warning'
import getComputedStyle from '@instructure/ui-utils/lib/dom/getComputedStyle'
import getBoundingClientRect from '@instructure/ui-utils/lib/dom/getBoundingClientRect'
import isVisible from '@instructure/ui-utils/lib/dom/isVisible'

import measureText from './measureText'
import cleanString from './cleanString'
import cleanData from './cleanData'

/**
 * ---
 * parent: TruncateText
 * ---
 * Truncate the text content of an HTML element and its children.
 *
 * @param {DOMNode} element A single element containing the content to be truncated.
 * @param {Object} options={} The options object.
 * @param {DOMNode} options.parent An optional parent element to use for calculations.
 * @param {number|string} options.maxLines Number of lines to allow before truncating.
 * @param {string} options.position=end Where to place the ellipsis within the string.
 * @param {string} options.truncate=character Add ellipsis after words or after any character.
 * @param {string} options.ellipsis=\u2026 Where to place the ellipsis within the string.
 * @param {string[]} options.ignore Characters to ignore at truncated end of string.
 * @param {number} options.lineHeight=1.2 Unitless multiplier to use in case element can have
 * 'normal' lineHeight. Adjust this to better match your font if needed.
 */

export function truncate (element, options) {
  const truncator = new Truncator(element, options)
  if (truncator) {
    return truncator.truncate()
  }
}

export default class Truncator {
  constructor (element, options = {}) {
    this._options = {
      parent: options.parent || element.parentElement,
      maxLines: options.maxLines || 1,
      position: options.position || 'end',
      truncate: options.truncate || 'character',
      ellipsis: options.ellipsis || '\u2026',
      ignore: options.ignore || [' ', '.', ','],
      lineHeight: options.lineHeight || 1.2
    }

    if (!element) {
      warning(element, '[Truncator] No element to truncate.')
      return
    }

    this._stage = element

    if (options.parent) {
      this._parent = this._options.parent
    } else {
      this._parent = this._options.maxLines === 'auto'
        ? this._stage.parentElement
        : this._stage
    }

    this._truncatedText = this._parent.textContent
    this._isTruncated = false

    this.setup()
  }

  setup () {
    if (!this._stage) {
      return
    }

    const { maxLines, truncate, lineHeight } = this._options
    const style = getComputedStyle(this._parent)
    // if no explicit lineHeight is inherited, use lineHeight multiplier for calculations
    const actualLineHeight = style.lineHeight === 'normal'
      ? lineHeight * parseFloat(style.fontSize)
      : parseFloat(style.lineHeight)
    const node = this._stage.firstChild.children
      ? this._stage.firstChild
      : this._stage

    let nodeDataIndexes = []
    let stringData = []

    this._nodeMap = this.getNodeMap(node)

    for (let i = 0; i < this._nodeMap.length; i++) {
      const item = this._nodeMap[i]
      if (truncate === 'word' && item.data[item.data.length - 1] === ' ') {
        // remove random whitespace data between nodes
        item.data.length -= 1
      }
      stringData[i] = item.data
      for (let j = 0; j < item.data.length; j++) {
        // map each word or character datum index to its corresponding node
        nodeDataIndexes.push(i)
      }
    }

    this._defaultStringData = cloneArray(stringData)
    this._nodeDataIndexes = cloneArray(nodeDataIndexes)
    this._maxHeight = maxLines === 'auto'
      ? getBoundingClientRect(this._parent).height
      : maxLines * actualLineHeight
    this._maxWidth = measureText(this._nodeMap.map(item => item.node), this._parent)
    this._maxLines = maxLines === 'auto'
      ? Math.round(this._maxHeight / actualLineHeight)
      : maxLines
  }

  getNodeMap (rootNode) {
    const { truncate } = this._options
    let map = []
    // parse child nodes and build a data map to associate each node with its data
    for (let i = 0; i < rootNode.childNodes.length; i++) {
      const node = rootNode.childNodes[i]
      if (node.nodeType === 1 || node.nodeType === 3) {
        const visible = isVisible(node, false)
        const textContent = node.textContent + ' '
        map.push({
          node: node,
          data: truncate === 'word'
            // eslint-disable-next-line no-useless-escape
            ? visible ? textContent.match(/.*?[\.\s\/]+?/g) : ''
            : visible ? node.textContent.split('') : []
        })
      }
    }

    return map
  }

  getNodeIndexes (data) {
    let nodeDataIndexes = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        nodeDataIndexes.push([i, j])
      }
    }
    return nodeDataIndexes
  }

  domString (data) {
    const keys = Object.keys(data)
    let html = ''

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const mapItem = this._nodeMap[key]
      const text = data[key].join('')
      const safeText = escapeHtml(text)

      if (mapItem.node.nodeType === 1) {
        const name = mapItem.node.nodeName
        const attr = mapItem.node.attributes
        let attributes = ''
        for (let j = 0; j < attr.length; j++) {
          const att = attr[j]
          attributes += ` ${att.nodeName}="${att.nodeValue}"`
        }
        html += `<${name}${attributes}>${safeText}</${name}>`
      } else if (mapItem.node.nodeType === 3) {
        html += safeText
      }
    }

    return html
  }

  checkFit (data) {
    const html = this.domString(data)
    const node = this._options.maxLines === 'auto'
      ? this._stage
      : this._parent
    let fits = true
    this._stage.innerHTML = html
    // allow a 0.5 px margin of error for browser calculation discrepancies
    if (getBoundingClientRect(node).height - this._maxHeight > 0.5) {
      fits = false
    }

    return fits
  }

  truncate () {
    const { ellipsis, ignore, position } = this._options
    const middle = position === 'middle'

    let truncated = false
    let fits = false
    let nodeIndex = 0
    let dataIndex = 0
    let truncatedText = ''
    let stringData = null
    let remove = null

    if (!this._stage) {
      return
    }

    stringData = cloneArray(this._defaultStringData)
    dataIndex = middle ? 0 : this._nodeDataIndexes.length - 1

    while (!fits) {
      if (dataIndex < 0) {
        break
      }

      if (middle) {
        // as data is removed from the middle of our set, the node order could
        // change each iteration, so we need to keep updating a node index matrix
        // based on the current string data
        const matrix = this.getNodeIndexes(stringData)
        const center = Math.floor(matrix.length / 2)
        // the node index and word index to remove
        remove = matrix[center]
        if (dataIndex > 0) {
          // remove word/character currently in the center
          stringData[remove[0]].splice(remove[1], 1, ellipsis)
        }
      } else {
        nodeIndex = this._nodeDataIndexes[dataIndex]
        if (dataIndex < this._nodeDataIndexes.length - 1) {
          stringData[nodeIndex] = stringData[nodeIndex].slice(0, -1)
          stringData[nodeIndex].push(ellipsis)
        }
      }
      // test new data
      fits = this.checkFit(stringData)

      if (fits) {
        for (let i = 0; i < stringData.length; i++) {
          const data = stringData[i]
          truncatedText += data.join('')
        }
        break
      } else {
        truncated = true
        if (middle) {
          // remove ellipsis before re-testing
          stringData[remove[0]].splice(remove[1], 1)
          dataIndex++
        } else {
          stringData[nodeIndex] = stringData[nodeIndex].slice(0, -1)
          dataIndex--
        }
      }
    }

    stringData = cleanData(stringData, this._options, true)

    if (truncated && !middle) {
      truncatedText = cleanString(truncatedText.split(ellipsis)[0], ignore, false, true, true)
      truncatedText += ellipsis
    } else if (truncated && middle) {
      const halves = truncatedText.split(ellipsis)
      truncatedText = cleanString(halves[0], ignore, false, true, true)
        + ellipsis
        + cleanString(halves[1], ignore, true, false, true)
    }

    return {
      isTruncated: truncated,
      text: truncatedText,
      data: stringData,
      constraints: {
        width: this._maxWidth,
        height: this._maxHeight,
        lines: this._maxLines
      }
    }
  }
}

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

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'esca... Remove this comment to see the full error message
import escapeHtml from 'escape-html'

import { cloneArray } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import {
  getComputedStyle,
  getBoundingClientRect,
  isVisible
} from '@instructure/ui-dom-utils'

import measureText from './measureText'
import cleanString from './cleanString'
import cleanData from './cleanData'

/**
 * ---
 * parent: TruncateText
 * private: true
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

// @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
function truncate(element, options) {
  const truncator = new Truncator(element, options)
  if (truncator) {
    return truncator.truncate()
  }
}

class Truncator {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
  constructor(element, options = {}) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Trunca... Remove this comment to see the full error message
    this._options = {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'parent' does not exist on type '{}'.
      parent: options.parent || element.parentElement,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'maxLines' does not exist on type '{}'.
      maxLines: options.maxLines || 1,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'position' does not exist on type '{}'.
      position: options.position || 'end',
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'truncate' does not exist on type '{}'.
      truncate: options.truncate || 'character',
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ellipsis' does not exist on type '{}'.
      ellipsis: options.ellipsis || '\u2026',
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ignore' does not exist on type '{}'.
      ignore: options.ignore || [' ', '.', ','],
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'lineHeight' does not exist on type '{}'.
      lineHeight: options.lineHeight || 1.2,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldTruncateWhenInvisible' does not ex... Remove this comment to see the full error message
      shouldTruncateWhenInvisible: options.shouldTruncateWhenInvisible
    }

    if (!element) {
      // @ts-expect-error ts-migrate(2555) FIXME: Expected at least 5 arguments, but got 2.
      error(false, '[Truncator] No element to truncate.')
      return
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
    this._stage = element

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'parent' does not exist on type '{}'.
    if (options.parent) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_parent' does not exist on type 'Truncat... Remove this comment to see the full error message
      this._parent = this._options.parent
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_parent' does not exist on type 'Truncat... Remove this comment to see the full error message
      this._parent =
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Trunca... Remove this comment to see the full error message
        this._options.maxLines === 'auto'
          ? // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
            this._stage.parentElement
          : // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
            this._stage
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_truncatedText' does not exist on type '... Remove this comment to see the full error message
    this._truncatedText = this._parent.textContent
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_isTruncated' does not exist on type 'Tr... Remove this comment to see the full error message
    this._isTruncated = false

    this.setup()
  }

  setup() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
    if (!this._stage) {
      return
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Trunca... Remove this comment to see the full error message
    const { maxLines, truncate, lineHeight } = this._options
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_parent' does not exist on type 'Truncat... Remove this comment to see the full error message
    const style = getComputedStyle(this._parent)
    // if no explicit lineHeight is inherited, use lineHeight multiplier for calculations
    const actualLineHeight =
      style.lineHeight === 'normal'
        ? lineHeight * parseFloat(style.fontSize)
        : parseFloat(style.lineHeight)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
    const node = this._stage.firstChild.children
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
        this._stage.firstChild
      : // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
        this._stage

    const nodeDataIndexes = []
    const stringData = []

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeMap' does not exist on type 'Trunca... Remove this comment to see the full error message
    this._nodeMap = this.getNodeMap(node)

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeMap' does not exist on type 'Trunca... Remove this comment to see the full error message
    for (let i = 0; i < this._nodeMap.length; i++) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeMap' does not exist on type 'Trunca... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultStringData' does not exist on ty... Remove this comment to see the full error message
    this._defaultStringData = cloneArray(stringData)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeDataIndexes' does not exist on type... Remove this comment to see the full error message
    this._nodeDataIndexes = cloneArray(nodeDataIndexes)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_maxHeight' does not exist on type 'Trun... Remove this comment to see the full error message
    this._maxHeight =
      maxLines === 'auto'
        ? // @ts-expect-error ts-migrate(2339) FIXME: Property '_parent' does not exist on type 'Truncat... Remove this comment to see the full error message
          getBoundingClientRect(this._parent).height
        : maxLines * actualLineHeight
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_maxWidth' does not exist on type 'Trunc... Remove this comment to see the full error message
    this._maxWidth = measureText(
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeMap' does not exist on type 'Trunca... Remove this comment to see the full error message
      this._nodeMap.map((item) => item.node),
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_parent' does not exist on type 'Truncat... Remove this comment to see the full error message
      this._parent
    )
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_maxLines' does not exist on type 'Trunc... Remove this comment to see the full error message
    this._maxLines =
      maxLines === 'auto'
        ? // @ts-expect-error ts-migrate(2339) FIXME: Property '_maxHeight' does not exist on type 'Trun... Remove this comment to see the full error message
          Math.round(this._maxHeight / actualLineHeight)
        : maxLines
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'rootNode' implicitly has an 'any' type.
  getNodeMap(rootNode) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Trunca... Remove this comment to see the full error message
    const { shouldTruncateWhenInvisible, truncate } = this._options
    const nodes: ChildNode[] = Array.from(rootNode.childNodes)
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'map' implicitly has type 'any[]' in some... Remove this comment to see the full error message
    const map = []
    // parse child nodes and build a data map to associate each node with its data
    nodes.forEach((node) => {
      if (node.nodeType === 1 || node.nodeType === 3) {
        const shouldTruncate = shouldTruncateWhenInvisible
          ? true
          : isVisible(node, false)
        const textContent = node.textContent + ' '
        map.push({
          node,
          data:
            truncate === 'word'
              ? shouldTruncate
                ? // eslint-disable-next-line no-useless-escape
                  textContent.match(/.*?[\.\s\/]+?/g)
                : ''
              : shouldTruncate
              ? // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                node.textContent.split('')
              : []
        })
      }
    })
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'map' implicitly has an 'any[]' type.
    return map
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  getNodeIndexes(data) {
    const nodeDataIndexes = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        nodeDataIndexes.push([i, j])
      }
    }
    return nodeDataIndexes
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  domString(data) {
    const keys = Object.keys(data)
    let html = ''

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeMap' does not exist on type 'Trunca... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  checkFit(data) {
    const html = this.domString(data)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Trunca... Remove this comment to see the full error message
    const node = this._options.maxLines === 'auto' ? this._stage : this._parent
    let fits = true
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
    this._stage.innerHTML = html
    // allow a 0.5 px margin of error for browser calculation discrepancies
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'height' does not exist on type 'object'.
    if (getBoundingClientRect(node).height - this._maxHeight > 0.5) {
      fits = false
    }

    return fits
  }

  truncate() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Trunca... Remove this comment to see the full error message
    const { ellipsis, ignore, position } = this._options
    const middle = position === 'middle'

    let truncated = false
    let fits = false
    let nodeIndex = 0
    let dataIndex = 0
    let truncatedText = ''
    let stringData = null
    let remove = null

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_stage' does not exist on type 'Truncato... Remove this comment to see the full error message
    if (!this._stage) {
      return
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultStringData' does not exist on ty... Remove this comment to see the full error message
    stringData = cloneArray(this._defaultStringData)
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeDataIndexes' does not exist on type... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeDataIndexes' does not exist on type... Remove this comment to see the full error message
        nodeIndex = this._nodeDataIndexes[dataIndex]
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_nodeDataIndexes' does not exist on type... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          stringData[remove[0]].splice(remove[1], 1)
          dataIndex++
        } else {
          stringData[nodeIndex] = stringData[nodeIndex].slice(0, -1)
          dataIndex--
        }
      }
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_options' does not exist on type 'Trunca... Remove this comment to see the full error message
    stringData = cleanData(stringData, this._options, true)

    if (truncated && !middle) {
      truncatedText = cleanString(
        truncatedText.split(ellipsis)[0],
        ignore,
        false,
        true,
        true
      )
      truncatedText += ellipsis
    } else if (truncated && middle) {
      const halves = truncatedText.split(ellipsis)
      truncatedText =
        cleanString(halves[0], ignore, false, true, true) +
        ellipsis +
        cleanString(halves[1], ignore, true, false, true)
    }

    return {
      isTruncated: truncated,
      text: truncatedText,
      data: stringData,
      constraints: {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_maxWidth' does not exist on type 'Trunc... Remove this comment to see the full error message
        width: this._maxWidth,
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_maxHeight' does not exist on type 'Trun... Remove this comment to see the full error message
        height: this._maxHeight,
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_maxLines' does not exist on type 'Trunc... Remove this comment to see the full error message
        lines: this._maxLines
      }
    }
  }
}

export default truncate

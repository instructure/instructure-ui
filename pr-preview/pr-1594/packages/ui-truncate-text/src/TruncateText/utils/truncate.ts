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
import { TruncateTextCommonProps } from '../props'

export type TruncatorOptions = {
  parent?: Node
  lineHeight?: number
} & TruncateTextCommonProps

type NodeMapData = {
  node: Node
  data: string[]
}

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
function truncate(element: Element, options?: TruncatorOptions) {
  const truncator = new Truncator(element, options)
  if (truncator) {
    return truncator.truncate()
  }
  return
}

class Truncator {
  private _options: Required<Omit<TruncatorOptions, 'parent'>> &
    Pick<TruncatorOptions, 'parent'>
  private _stage!: Element
  private _parent?: Node
  private _nodeMap!: NodeMapData[]
  private _defaultStringData!: string[][]
  private _nodeDataIndexes!: number[]
  private _maxHeight!: number
  private _maxWidth!: number
  private _maxLines!: number

  constructor(element: Element, options: TruncatorOptions = {}) {
    const parentElement = element?.parentElement
      ? element?.parentElement
      : undefined
    this._options = {
      parent: options.parent || parentElement,
      maxLines: options.maxLines || 1,
      position: options.position || 'end',
      truncate: options.truncate || 'character',
      ellipsis: options.ellipsis || '\u2026',
      ignore: options.ignore || [' ', '.', ','],
      lineHeight: options.lineHeight || 1.2,
      shouldTruncateWhenInvisible: !!options.shouldTruncateWhenInvisible
    }

    if (!element) {
      error(false, '[Truncator] No element to truncate.')
      return
    }

    this._stage = element

    if (options.parent) {
      this._parent = this._options.parent
    } else {
      const parentEl = this._stage.parentElement
        ? this._stage.parentElement
        : undefined
      this._parent = this._options.maxLines === 'auto' ? parentEl : this._stage
    }
    this.setup()
  }

  setup() {
    if (!this._stage) {
      return
    }
    const { maxLines, truncate, lineHeight } = this._options
    const style = getComputedStyle(this._parent)
    // if no explicit lineHeight is inherited, use lineHeight multiplier for calculations
    const actualLineHeight =
      style.lineHeight === 'normal'
        ? lineHeight * parseFloat(style.fontSize)
        : parseFloat(style.lineHeight)
    const node = (this._stage.firstChild as Element).children
      ? this._stage.firstChild!
      : this._stage

    const nodeDataIndexes: number[] = []
    const stringData: string[][] = []

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
    this._maxHeight =
      maxLines === 'auto'
        ? getBoundingClientRect(this._parent).height
        : maxLines * actualLineHeight
    this._maxWidth = measureText(
      this._nodeMap.map((item) => item.node),
      this._parent
    )
    this._maxLines =
      maxLines === 'auto'
        ? Math.round(this._maxHeight / actualLineHeight)
        : maxLines
  }

  getNodeMap(rootNode: Node) {
    const { shouldTruncateWhenInvisible, truncate } = this._options
    const nodes: ChildNode[] = Array.from(rootNode.childNodes)
    const map: NodeMapData[] = []
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
                  textContent.match(/.*?[\.\s\/]+?/g)!
                : ['']
              : shouldTruncate
              ? node.textContent!.split('')
              : []
        })
      }
    })
    return map
  }

  getNodeIndexes(data: string[][]): number[][] {
    const nodeDataIndexes = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        nodeDataIndexes.push([i, j])
      }
    }
    return nodeDataIndexes
  }

  domString(data: string[][]) {
    let html = ''

    for (let i = 0; i < data.length; i++) {
      const mapItem = this._nodeMap[i]
      const text = data[i].join('')
      const safeText = escapeHtml(text)

      if (mapItem.node.nodeType === Node.ELEMENT_NODE) {
        const name = mapItem.node.nodeName
        const attr = (mapItem.node as Element).attributes
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

  checkFit(data: string[][]) {
    const html = this.domString(data)
    const node = this._options.maxLines === 'auto' ? this._stage : this._parent
    let fits = true
    this._stage.innerHTML = html
    // allow a 0.5 px margin of error for browser calculation discrepancies
    if (getBoundingClientRect(node).height - this._maxHeight > 0.5) {
      fits = false
    }

    return fits
  }

  truncate() {
    const { ellipsis, ignore, position } = this._options
    const middle = position === 'middle'
    let truncated = false
    let truncatedText = ''
    let stringData: string[][] | null = null

    if (!this._stage) {
      return
    }

    const binarySearch = (
      _low: number,
      _high: number,
      ev: (tryNumber: number, middle: boolean) => boolean,
      middle: boolean,
      // in case we can not find the result
      _default: number | null = null
    ): number | null => {
      let low = _low
      let high = _high
      let bestResult = _default
      while (low <= high) {
        const tryNumber = Math.floor((low + high) / 2)
        if (ev(tryNumber, middle)) {
          high = tryNumber - 1
          bestResult = tryNumber
        } else {
          low = tryNumber + 1
        }
      }
      return bestResult
    }

    const truncateArray = (
      truncatedLength: number,
      originalArray: string[][],
      indexArray: number[],
      middle: boolean
    ): { truncated: boolean; truncatedArray: string[][] } => {
      let truncated = false
      const truncatedArray = cloneArray(originalArray)

      switch (truncatedLength) {
        // truncate nothing
        case 0:
          break

        // truncate all
        case indexArray.length:
          truncated = true

          for (let i = 0; i < truncatedArray.length; i++) {
            truncatedArray[i] = []
          }
          truncatedArray[0].push(ellipsis)
          break

        // truncate a positive amount of elements
        default:
          truncated = true

          if (middle) {
            const dataHalves: number[] = Array(2)
            // calculate the indexes for two parts
            dataHalves[0] = Math.floor(
              (indexArray.length - truncatedLength - 1) / 2
            )
            dataHalves[1] = dataHalves[0] + truncatedLength + 1
            const nodeHalves = dataHalves.map((index) => indexArray[index])
            const sliceAmounts: number[] = Array(2)
            sliceAmounts[0] = dataHalves[0] + 1
            sliceAmounts[1] =
              indexArray.length - truncatedLength - sliceAmounts[0]

            // keep the first part
            for (let i = 0; i <= nodeHalves[0]; i++) {
              switch (true) {
                case i < nodeHalves[0]:
                  sliceAmounts[0] -= truncatedArray[i].length
                  break

                case i === nodeHalves[0]:
                  truncatedArray[i] = originalArray[i].slice(0, sliceAmounts[0])
                  truncatedArray[i].push(ellipsis)
                  break
              }
            }

            // and the second part
            for (let i = originalArray.length - 1; i >= nodeHalves[1]; i--) {
              switch (true) {
                case i > nodeHalves[1]:
                  sliceAmounts[1] -= originalArray[i].length
                  break

                case i === nodeHalves[1]:
                  if (nodeHalves[1] > nodeHalves[0])
                    truncatedArray[i] = originalArray[i].slice(-sliceAmounts[1])
                  if (nodeHalves[1] === nodeHalves[0])
                    truncatedArray[i] = truncatedArray[i].concat(
                      originalArray[i].slice(-sliceAmounts[1])
                    )
                  break
              }
            }

            // delete the middle
            for (let i = nodeHalves[0] + 1; i < nodeHalves[1]; i++) {
              truncatedArray[i] = []
            }
          } else {
            // the right most index to keep from truncating
            const indexToTry = indexArray.length - truncatedLength - 1
            const nodeIndex = indexArray[indexToTry]

            let sliceAmount = indexToTry + 1

            for (let i = 0; i < originalArray.length; i++) {
              switch (true) {
                case i < nodeIndex:
                  sliceAmount -= truncatedArray[i].length
                  break

                case i === nodeIndex:
                  truncatedArray[i] = truncatedArray[i].slice(0, sliceAmount)
                  truncatedArray[i].push(ellipsis)
                  break

                case i > nodeIndex:
                  truncatedArray[i] = []
                  break
              }
            }
          }
          break
      }
      return { truncated, truncatedArray }
    }

    const truncateEvaluate = (truncatedLength: number, middle: boolean) => {
      const { truncatedArray } = truncateArray(
        truncatedLength,
        this._defaultStringData,
        this._nodeDataIndexes,
        middle
      )
      return this.checkFit(truncatedArray)
    }

    // find the best number of element to truncate
    const finestMatch = binarySearch(
      0,
      this._nodeDataIndexes.length,
      truncateEvaluate,
      middle,
      this._nodeDataIndexes.length
    )

    ;({ truncated, truncatedArray: stringData } = truncateArray(
      finestMatch!,
      this._defaultStringData,
      this._nodeDataIndexes,
      middle
    ))

    stringData = cleanData(stringData, this._options, true)
    for (let i = 0; i < stringData.length; i++) {
      const data = stringData[i]
      truncatedText += data.join('')
    }
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
        width: this._maxWidth,
        height: this._maxHeight,
        lines: this._maxLines
      }
    }
  }
}

export default truncate

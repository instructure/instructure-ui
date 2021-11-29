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

import { getComputedStyle } from '@instructure/ui-dom-utils'

/**
 * ---
 * parent: TruncateText
 * private: true
 * ---
 * Finds the max potential width of set of DOM nodes.
 *
 * @param {DOMNode[]} nodes Array of DOM nodes.
 * @param {DOMNode} parentNode The node to inherit default styles from.
 */
function measureText(nodes: Node[], parentNode?: Node) {
  let width = 0
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    width += measure(node.textContent, node.nodeType === 1 ? node : parentNode)
  }
  return width
}

function measure(string: string | null, domNode?: Node) {
  const style = getComputedStyle(domNode)
  // we use a canvas in a doc fragment to prevent having to render the string full width in the DOM
  const canvas = document.createElement('canvas')
  document.createDocumentFragment().appendChild(canvas)

  const context = canvas.getContext('2d')
  if (!context || !string) {
    return 0
  }

  let text = string
  let letterOffset = 0
  let width = 0
  // grab individual font styles
  // some browsers don't report a value for style['font']
  context.font = [
    style.fontWeight,
    style.fontStyle,
    style.fontSize,
    style.fontFamily
  ].join(' ')

  if (style.textTransform === 'uppercase') {
    text = string.toUpperCase()
  } else if (style.textTransform === 'lowercase') {
    text = string.toLowerCase()
  } else if (style.textTransform === 'capitalize') {
    text = string.replace(/\b\w/g, (str: string) => str.toUpperCase())
  }

  if (style.letterSpacing !== 'normal') {
    letterOffset = text.length * parseInt(style.letterSpacing as string)
  }

  width = context.measureText(text).width + letterOffset
  // returns the max potential width of the text, assuming the text was on a single line
  return width
}

export default measureText

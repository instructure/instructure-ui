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

import getComputedStyle from '@instructure/ui-dom-utils/lib/getComputedStyle'

/**
 * ---
 * parent: TruncateText
 * ---
 * Finds the max potential width of set of DOM nodes.
 *
 * @param {DOMNode[]} nodes Array of DOM nodes.
 * @param {DOMNode} parentNode The node to inherit default styles from.
 */
export default function measureText (nodes, parentNode) {
  let width = 0
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    width += measure(node.textContent, node.nodeType === 1 ? node : parentNode)
  }
  return width
}

export function measure (string, domNode) {
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
  const font = [
    style['font-weight'],
    style['font-style'],
    style['font-size'],
    style['font-family']
  ].join(' ')

  context.font = font

  if (style['text-transform'] === 'uppercase') {
    text = string.toUpperCase()
  } else if (style['text-transform'] === 'lowercase') {
    text = string.toLowerCase()
  } else if (style['text-transform'] === 'capitalize') {
    text = string.replace(/\b\w/g, str => str.toUpperCase())
  }

  if (style['letter-spacing'] !== 'normal') {
    letterOffset = text.length * parseInt(style['letter-spacing'])
  }

  width = context.measureText(text).width + letterOffset
  // returns the max potential width of the text, assuming the text was on a single line
  return width
}

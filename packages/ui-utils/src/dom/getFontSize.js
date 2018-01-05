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

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Gets font size in px
 *
 * @param {ReactComponent|DomNode} el - component or DOM node
 * @returns {Object} font size in px
 */
export default function getFontSize (el) {
  const m = document.createElement('div')

  let container = el || document.body
  let fontSize = 16

  if (!container) {
    container = document.createElement('body')
    container.style.cssText = 'font-size:1em !important'
    document.documentElement.insertBefore(container, document.body)
  }

  m.style.cssText = [
    'display: inline-block !important;',
    'padding: 0 !important;',
    'line-height: 1 !important;',
    'position: absolute !important;',
    'visibility: hidden !important;',
    'font-size: 1em !important;'
  ].join('')
  m.appendChild(document.createTextNode('M'))
  container.appendChild(m)
  fontSize = m.offsetHeight
  container.removeChild(m)

  return fontSize
}

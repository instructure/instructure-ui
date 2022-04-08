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
import { plugins, format } from 'pretty-format'
import type { PrettyFormatOptions } from 'pretty-format'
import { isElement } from './isElement'

function formatElement(
  element: Element | Document | DocumentFragment,
  maxLength: number,
  options: PrettyFormatOptions
): string {
  let htmlElement: HTMLElement = element as HTMLElement
  if ((element as Document).documentElement) {
    // eslint-disable-next-line no-param-reassign
    htmlElement = (element as Document).documentElement
  }

  const debugContent = format(htmlElement, {
    plugins: [plugins.DOMElement, plugins.DOMCollection],
    printFunctionName: false,
    highlight: true,
    ...options
  })
  return typeof maxLength !== 'undefined' &&
    htmlElement.outerHTML.length > maxLength
    ? `${debugContent.slice(0, maxLength)}...`
    : debugContent
}

function elementToString(
  element: Element | Document | DocumentFragment,
  maxLength = 7000,
  options = { highlight: false }
): string {
  if (isElement(element)) {
    return formatElement(element, maxLength, options)
  } else if (typeof element.toString === 'function') {
    return element.toString()
  } else {
    return JSON.stringify(element)
  }
}

export { elementToString }

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
import runAxeCheck from '@instructure/ui-axe-check'
import { fireEvent, prettyDOM } from 'dom-testing-library'

function getOwnerDocument (element) {
  return element.ownerDocument
}

function getOwnerWindow (element) {
  const doc = getOwnerDocument(element)
  return doc.defaultView || doc.parentWindow
}

function typeIn (element, value) {
  element.value = value // eslint-disable-line no-param-reassign
  fireEvent(element, new Event('change', {
    bubbles: true,
    cancelable: true,
    target: { value }
  }))
}

function getTextContent (element) {
  return element.textContent
}

function getTagName (element) {
  return element.tagName.toLowerCase()
}

function getComputedStyle (element) {
  return getOwnerWindow(element).getComputedStyle(element)
}

function visible (element) {
  return !!( element.offsetWidth || element.offsetHeight || element.getClientRects().length )
}

function getAttribute (element, ...args) {
  return element.getAttribute(...args)
}

function getParentNode (element) {
  return element.parentNode
}

function focused (element) {
  return (element === getOwnerDocument(element).activeElement)
}

function getDOMNode (element) {
  return element
}

function debug (element = document.body) {
  // eslint-disable-next-line no-console
  console.log(prettyDOM(element))
}

async function accessible (element = document.documentElement, options) {
  if (element instanceof Element) {
    return runAxeCheck(element, options)
  } else {
    throw Error('[ui-test-utils] accessibility check can only run on a single DOM Element!')
  }
}

// aliases
const parent = getParentNode
const text = getTextContent
const tag = getTagName
const computedStyle = getComputedStyle
const attribute = getAttribute

export {
  getOwnerWindow,
  getOwnerDocument,
  computedStyle,
  getComputedStyle,
  tag,
  getTagName,
  typeIn,
  attribute,
  getAttribute,
  getDOMNode,
  debug,
  accessible,
  getTextContent,
  text,
  getParentNode,
  parent,
  focused,
  visible
}

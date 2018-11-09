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
import { prettyDOM } from 'dom-testing-library'
import { fireEvent } from './events'

import { matchElementBySelector } from './matchers'

function getOwnerDocument (element) {
  return element.ownerDocument || document
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
  if (element instanceof Element) {
    return getOwnerWindow(element).getComputedStyle(element)
  } else {
    throw new Error(`[ui-test-utils] cannot get computed style for an invalid Element: ${element}`)
  }
}

function hidden (element) {
  const cs = getComputedStyle(element)
  return (
    cs.display !== 'inline' &&
    element.offsetWidth <= 0 &&
    element.offsetHeight <= 0
  ) || cs.display === 'none'
}

function positioned (element) {
  const POS = ['fixed', 'absolute']
  if (POS.includes(element.style.position.toLowerCase())) return true
  if (POS.includes(getComputedStyle(element).getPropertyValue('position').toLowerCase())) return true
  return false
}

function visible (element) {
  let node = element
  while (node) {
    if (node === document.body) break
    if (hidden(node)) return false
    if (positioned(node)) break
    node = node.parentNode
  }
  return true
}

function onscreen (element) {
  const bounding = element.getBoundingClientRect()
  const win = getOwnerWindow(element)
  const doc = getOwnerDocument(element)
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (win.innerHeight || doc.documentElement.clientHeight) &&
      bounding.right <= (win.innerWidth || doc.documentElement.clientWidth)
  )
}

function clickable (element) {
  return onscreen(element)
}

function focusable (element) {
  const selector = [
    'a[href]:not([disabled])',
    'frame',
    'iframe',
    'object',
    'input:not([type=hidden]):not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '*[tabindex]'
  ]
  return !element.disabled && visible(element) && matchElementBySelector(element, selector.join(','))
}

function tabbable (element) {
  return focusable(element) && parseInt(element.getAttribute('tabindex')) > 0
}

function getAttribute (element, ...args) {
  return element.getAttribute(...args)
}

function getParentNode (element) {
  return element.parentNode
}

function containsFocus (element) {
  const activeElement = getOwnerDocument(element).activeElement
  return (element && (activeElement === element || element.contains(activeElement)))
}

function focused (element) {
  return (element === getOwnerDocument(element).activeElement)
}

function getDOMNode (element) {
  return element
}

function getBoundingClientRect (element) {
  return element.getBoundingClientRect()
}

function hasClass (element, classname) {
  return element.classList.contains(classname)
}

function getId (element) {
  return element.id
}

function debug (element = document.body) {
  // eslint-disable-next-line no-console
  console.log(prettyDOM(element))
}

function accessible (element = document.body, options) {
  if (element instanceof Element) {
    return runAxeCheck(element, options)
  } else {
    throw new Error('[ui-test-utils] accessibility check can only run on a single DOM Element!')
  }
}

export {
  getId,
  getOwnerWindow,
  getOwnerDocument,
  getComputedStyle,
  getTagName,
  typeIn,
  getAttribute,
  getDOMNode,
  debug,
  accessible,
  getTextContent,
  getParentNode,
  getBoundingClientRect,
  hasClass,
  containsFocus,
  focused,
  visible,
  focusable,
  tabbable,
  clickable
}

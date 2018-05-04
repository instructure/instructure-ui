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

 import { changedPackageWarning } from '../react/deprecated'
 import warning from '../warning'

 import findDOMNode from './findDOMNode'

 export default function findTabbable (el) {
   warning(false, '[%s] was deprecated in version %s. %s', 'findTabbable', '5.0.0', changedPackageWarning(
     'ui-utils',
     'ui-a11y'
   ) || '')

  const element = findDOMNode(el)

  if (!element || typeof element.querySelectorAll !== 'function') {
    return []
  }

  const focusableSelector = 'a[href],frame,iframe,object,input:not([type=hidden]),select,textarea,button,*[tabindex]'
  const matches = element.querySelectorAll(focusableSelector)
  return [].slice.call(matches, 0).filter(el => tabbable(el))
}

function focusable (element) {
  return !element.disabled && visible(element)
}

function hidden (element) {
  const cs = getComputedStyle(element)
  return (cs.display !== 'inline' && element.offsetWidth <= 0 && element.offsetHeight <= 0) || cs.display === 'none'
}

function positioned (element) {
  const POS = ['fixed', 'absolute']
  if (POS.includes(element.style.position.toLowerCase())) return true
  if (POS.includes(getComputedStyle(element).getPropertyValue('position').toLowerCase())) return true
  return false
}

function visible (element) {
  /* eslint no-param-reassign:0 */
  while (element) {
    if (element === document.body) break
    if (hidden(element)) return false
    if (positioned(element)) break
    element = element.parentNode
  }
  return true
}

function isInvalidTabIndex (tabIndex) {
  return !isNaN(tabIndex) && tabIndex < 0
}

function tabbable (element) {
  return !isInvalidTabIndex(element.getAttribute('tabindex')) && focusable(element)
}

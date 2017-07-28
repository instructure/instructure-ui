/**
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 **/

import getComputedStyle from './getComputedStyle'

export default function findTabbable (element) {
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

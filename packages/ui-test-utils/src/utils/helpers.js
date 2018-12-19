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

import { elementToString } from './elementToString'
import runAxeCheck from '@instructure/ui-axe-check'

import { fireEvent } from './events'

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

function positioned (element) {
  const style = getComputedStyle(element)
  const transform = style.getPropertyValue('-webkit-transform') ||
                    style.getPropertyValue('-moz-transform') ||
                    style.getPropertyValue('-ms-transform') ||
                    style.getPropertyValue('-o-transform') ||
                    style.getPropertyValue('transform') || 'none'
  return (style.position !== 'static' ||
    // initial value of transform can be 'none' or a matrix equivalent
    (transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)')
  )
}

function getViewportRects (element) {
  const doc = getOwnerDocument(element)
  const viewport = {
    width: Math.max(
      doc.body.scrollWidth,
      doc.documentElement.scrollWidth,
      doc.body.offsetWidth,
      doc.documentElement.offsetWidth,
      doc.body.clientWidth,
      doc.documentElement.clientWidth,
      window.innerWidth || 0
    ),
    height: Math.max(
      doc.body.scrollHeight,
      doc.documentElement.scrollHeight,
      doc.body.offsetHeight,
      doc.documentElement.offsetHeight,
      doc.body.clientHeight,
      doc.documentElement.clientHeight,
      window.innerHeight || 0
    )
  }

  return [{
    ...viewport,
    top: 0,
    right: viewport.width,
    bottom: viewport.height,
    left: 0,
    overflow: null,
    positioned: false
  }]
}

function getPositionedParents (element) {
  const parents = []
  let parent = element

  // eslint-disable-next-line no-cond-assign
  while ((parent = parent.parentNode) &&
    parent &&
    parent instanceof HTMLElement &&
    !(parent instanceof HTMLBodyElement)
  ) {
    if (positioned(parent)) {
      parents.push(parent)
    }
  }

  return parents
}

function rectToObject (rect) {
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  }
}

function getClientRects (element) {
  const props = {
    overflow: getComputedStyle(element).overflow,
    positioned: positioned(element)
  }
  let rects = [{
    ...rectToObject(element.getBoundingClientRect()),
    ...props
  }]
  rects = rects.concat(
    Array.from(element.getClientRects())
      .map((rect) => {
        return { ...rectToObject(rect), ...props }
      })
  )
  return rects
}

function visible (element) {
  if (element instanceof HTMLHtmlElement || element.nodeType !== 1) {
    return true
  }

  const style = getComputedStyle(element)

  if (style.visibility === 'hidden' || style.display === 'none') {
    return false
  }

  const elementRects = getClientRects(element)

  const elementWidth = element.offsetWidth || elementRects[0].width || 0
  const elementHeight = element.offsetHeight || elementRects[0].height || 0
  const children = Array.from(element.childNodes)

  // handle inline elements with block children...
  if (style.display === 'inline' && children.length > 0 && !(element instanceof HTMLIFrameElement)) {
    if (children.length > 0) {
      return children.reduce((previousChildIsVisible, child) => {
        return previousChildIsVisible || visible(child)
      }, false)
    }
  } else if (elementWidth <= 0 && elementHeight <= 0) {
    return false
  }

  const rects = [elementRects]
    .concat(getPositionedParents(element).map(parent => getClientRects(parent)))

  rects.push(getViewportRects(element))

  return rects
    .reduce((previousIsVisible, childRects, index) => {
      const parentRects = rects[index + 1]

      if (!parentRects) {
        return previousIsVisible
      }

      return previousIsVisible && (
        parentRects.reduce((visibleInPreviousParent, parentRect) => {
          return visibleInPreviousParent ||
            childRects.reduce((previousChildIsVisible, childRect) => {
              const childIsPositioned = (childRect.positioned && parentRect.overflow === 'visible')
              const currentChildIsVisible = childIsPositioned || (
                (childRect.top <= parentRect.bottom) &&
                ((childRect.top + parentRect.bottom) >= 0) &&
                (childRect.bottom > parentRect.top) &&
                (childRect.left <= parentRect.right) &&
                ((childRect.left + parentRect.right) >= 0) &&
                (childRect.right > parentRect.left)
              )
              return previousChildIsVisible || currentChildIsVisible
            }, false)
        }, false)
      )
    }, true)
}

function onscreen (element) {
  return visible(element)
}

function clickable (element) {
  const rects = Array.from(element.getClientRects())
    .concat(element.getBoundingClientRect())
  return visible(element) && rects.reduce((onscreen, rect) => {
    if (onscreen) return true
    const doc = getOwnerDocument(element)
    for (let x = Math.floor(rect.left), maxX = Math.ceil(rect.right); x <= maxX; x++)
    for (let y = Math.floor(rect.top), maxY = Math.ceil(rect.bottom); y <= maxY; y++) {
      const elementFromPoint = doc.elementFromPoint(x, y)
      if (element.contains(elementFromPoint) || element === elementFromPoint) {
        return true
      }
    }
    return false
  }, false)
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
  return !element.disabled && visible(element) && element.matches(selector.join(','))
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

function debug (...args) {
  // eslint-disable-next-line no-console
  console.log(toString(...args))
}

function toString (...args) {
  return elementToString(...args)
}

function accessible (element = document.body, options) {
  if (element instanceof Element) {
    return runAxeCheck(element, options)
  } else {
    throw new Error('[ui-test-utils] accessibility check can only run on a single, valid DOM Element!')
  }
}

export {
  toString,
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
  clickable,
  onscreen
}

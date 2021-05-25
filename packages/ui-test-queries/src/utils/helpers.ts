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

import { elementToString } from './elementToString'
import { fireEvent } from './events'
import { isElement } from './isElement'
import { querySelector, querySelectorAll, matchesSelector } from './selectors'

interface Rectangle {
  bottom: number
  readonly height: number
  left: number
  right: number
  top: number
  readonly width: number
  x?: number
  y?: number
}

interface ClientRectangle extends Rectangle {
  overflow: string | null
  positioned: boolean
}

function getOwnerDocument(element: Node) {
  return element.ownerDocument || document
}

function getOwnerWindow(element: Node) {
  const doc = getOwnerDocument(element)
  return doc.defaultView
}

function typeIn(element: Element, text: string) {
  // We could use here generics to make it better?
  const initialValue = (element as any).value
  const characterCount = text.length
  const eventInit = {
    bubbles: true,
    cancelable: true,
    defaultPrevented: false,
    eventPhase: 2,
    isTrusted: true
  }
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      try {
        for (let i = 0; i < characterCount; ++i) {
          const code = text.charCodeAt(i)
          const keyEventData = {
            altKey: false,
            charCode: code,
            ctrlKey: false,
            keyCode: code,
            metaKey: false,
            shiftKey: false,
            which: code,
            ...eventInit
          }

          const inputEventData = {
            charCode: code,
            target: {
              value: initialValue + text.slice(0, i + 1)
            },
            ...eventInit
          }
          // not nice, but this is a very weird code :/
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fireEvent.keyDown(element, keyEventData)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fireEvent.keyPress(element, keyEventData)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fireEvent.beforeInput(element, inputEventData)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fireEvent.input(element, inputEventData)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fireEvent.change(element, inputEventData)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fireEvent.keyUp(element, keyEventData)
        }
        resolve()
      } catch (err) {
        reject(err)
      }
    }, 0)
  })
}

function getTextContent(element: Element): string | null {
  if (matchesSelector(element, 'input[type=submit], input[type=button]')) {
    return (element as any).value
  }
  return element.textContent
}
// aliases:
const text = getTextContent

function getTagName(element: Element) {
  return element.tagName.toLowerCase()
}
// aliases
const tagName = getTagName

function getComputedStyle(element: Element) {
  if (isElement(element) && getOwnerWindow(element)) {
    return getOwnerWindow(element)!.getComputedStyle(element)
  } else {
    throw new Error(
      `[ui-test-queries] cannot get computed style for an invalid Element: ${element}`
    )
  }
}

function positioned(element: Element) {
  const style = getComputedStyle(element)
  const transform =
    style.getPropertyValue('-webkit-transform') ||
    style.getPropertyValue('-moz-transform') ||
    style.getPropertyValue('-ms-transform') ||
    style.getPropertyValue('-o-transform') ||
    style.getPropertyValue('transform') ||
    'none'
  return (
    style.position !== 'static' ||
    // initial value of transform can be 'none' or a matrix equivalent
    (transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)')
  )
}

function getViewportRects(element: Element): ClientRectangle[] {
  const doc = getOwnerDocument(element)
  const win = getOwnerWindow(element)
  const viewport = {
    width: Math.max(
      doc.body.scrollWidth,
      doc.documentElement.scrollWidth,
      doc.body.offsetWidth,
      doc.documentElement.offsetWidth,
      doc.body.clientWidth,
      doc.documentElement.clientWidth,
      win?.innerWidth || 0
    ),
    height: Math.max(
      doc.body.scrollHeight,
      doc.documentElement.scrollHeight,
      doc.body.offsetHeight,
      doc.documentElement.offsetHeight,
      doc.body.clientHeight,
      doc.documentElement.clientHeight,
      win?.innerHeight || 0
    )
  }

  return [
    {
      ...viewport,
      top: 0,
      right: viewport.width,
      bottom: viewport.height,
      left: 0,
      overflow: null,
      positioned: false
    }
  ]
}

function getPositionedParents(element: Element) {
  const parents = []
  let parent: (Node & ParentNode) | null = element
  // eslint-disable-next-line no-cond-assign
  while (
    (parent = parent.parentNode) &&
    parent &&
    isElement(parent) &&
    (parent as Element).tagName.toLowerCase() !== 'body'
  ) {
    if (positioned(parent as Element)) {
      parents.push(parent)
    }
  }
  return parents
}

function rectToObject(rect: DOMRect): Rectangle {
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

function getClientRects(element: Element): ClientRectangle[] {
  const props = {
    overflow: getComputedStyle(element).overflow,
    positioned: positioned(element)
  }
  let rects: ClientRectangle[] = [
    {
      ...rectToObject(element.getBoundingClientRect()),
      ...props
    }
  ]
  rects = rects.concat(
    Array.from(element.getClientRects()).map((rect) => {
      return { ...rectToObject(rect), ...props }
    })
  )
  return rects
}

function visible(element: Element) {
  if (
    !isElement(element) ||
    (element && element.tagName.toLowerCase() === 'html')
  ) {
    return true
  }

  const style = getComputedStyle(element)
  if (
    style.visibility === 'hidden' ||
    style.display === 'none' ||
    style.opacity === '0'
  ) {
    return false
  }

  const elementRects = getClientRects(element)

  const elementWidth =
    (element as HTMLElement).offsetWidth || elementRects[0].width || 0
  const elementHeight =
    (element as HTMLElement).offsetHeight || elementRects[0].height || 0
  const children = Array.from(element.childNodes)

  // handle inline elements with block children...
  if (
    element.tagName.toLowerCase() !== 'iframe' &&
    style.display === 'inline' &&
    children.length > 0 &&
    children.filter((child) => visible(child as Element)).length === 0
  ) {
    return false
  } else if (elementWidth <= 0 && elementHeight <= 0) {
    return false
  }

  const rects = [elementRects].concat(
    getPositionedParents(element).map((parent) =>
      getClientRects(parent as Element)
    )
  )

  rects.push(getViewportRects(element))

  return rects.reduce((previousIsVisible, childRects, index) => {
    const parentRects = rects[index + 1]

    if (!parentRects) {
      return previousIsVisible
    }

    return (
      previousIsVisible &&
      parentRects.reduce((visibleInPreviousParent, parentRect) => {
        return (
          visibleInPreviousParent ||
          childRects.reduce((previousChildIsVisible, childRect) => {
            const childIsPositioned =
              childRect.positioned && parentRect.overflow === 'visible'
            const currentChildIsVisible =
              childIsPositioned ||
              (childRect.top <= parentRect.bottom &&
                childRect.top + parentRect.bottom >= 0 &&
                childRect.bottom > parentRect.top &&
                childRect.left <= parentRect.right &&
                childRect.left + parentRect.right >= 0 &&
                childRect.right > parentRect.left)
            return previousChildIsVisible || currentChildIsVisible
          }, false)
        )
      }, false)
    )
  }, true)
}

function onscreen(element: Element) {
  return visible(element)
}

function clickable(element: Element) {
  const rects = Array.from(element.getClientRects()).concat(
    element.getBoundingClientRect()
  )
  return (
    visible(element) &&
    rects.reduce((onscreen, rect) => {
      if (onscreen) return true
      const doc = getOwnerDocument(element)
      for (
        let x = Math.floor(rect.left), maxX = Math.ceil(rect.right);
        x <= maxX;
        x++
      )
        for (
          let y = Math.floor(rect.top), maxY = Math.ceil(rect.bottom);
          y <= maxY;
          y++
        ) {
          const elementFromPoint = doc.elementFromPoint(x, y)
          if (
            element.contains(elementFromPoint) ||
            element === elementFromPoint
          ) {
            return true
          }
        }
      return false
    }, false)
  )
}

function focusable(element: Element) {
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

  return (
    !(element as any).disabled &&
    visible(element) &&
    matchesSelector(element, selector.join(','))
  )
}

function tabbable(element: Element) {
  return focusable(element) && parseInt(getAttribute(element, 'tabindex')!) > 0
}

function getAttribute(element: Element, qualifiedName: string) {
  return element.getAttribute(qualifiedName)
}

function getParentNode(element: Element) {
  return element.parentNode
}
const parent = getParentNode

function containsFocus(element: Element) {
  const activeElement = getOwnerDocument(element).activeElement
  return (
    element && (activeElement === element || element.contains(activeElement))
  )
}

function focused(element: Element) {
  return element === getOwnerDocument(element).activeElement
}

function getDOMNode(element: Element) {
  return element
}
const node = getDOMNode

function getBoundingClientRect(element: Element) {
  return element.getBoundingClientRect()
}
const rect = getBoundingClientRect

function hasClass(element: Element, classname: string) {
  return element.classList.contains(classname)
}

function getId(element: Element) {
  return element.id
}
// aliases:
const id = getId

function debug(
  element: Element | Document | DocumentFragment,
  maxLength = 7000,
  options = { highlight: false }
) {
  // eslint-disable-next-line no-console
  console.log(toString(element, maxLength, options))
}

function toString(
  element: Element | Document | DocumentFragment,
  maxLength = 7000,
  options = { highlight: false }
) {
  return elementToString(element, maxLength, options)
}

function accessible(
  element = document.body,
  options?: Record<string, unknown>
) {
  if (isElement(element)) {
    return runAxeCheck(element, options)
  } else {
    throw new Error(
      '[ui-test-queries] accessibility check can only run on a single, valid DOM Element!'
    )
  }
}

function exists(element: Element) {
  const doc = getOwnerDocument(element)
  return doc && doc.body.contains(element)
}

function empty(element: Element) {
  if (element && (element as any).value) {
    return (element as any).value.length === 0 || !(element as any).value.trim()
  } else if (element && element.children) {
    return element.children.length === 0
  } else {
    throw new Error(
      `[ui-test-queries] cannot determine if a non-element is empty: ${toString(
        element
      )}`
    )
  }
}

function contains(element: Element, elementOrSelector?: string | Element) {
  if (typeof elementOrSelector === 'string') {
    return querySelector(element, elementOrSelector)
  } else if (isElement(elementOrSelector)) {
    return element.contains(elementOrSelector!)
  } else if (
    elementOrSelector &&
    typeof (elementOrSelector as any).getDOMNode === 'function'
  ) {
    return element.contains((elementOrSelector as any).getDOMNode())
  } else {
    return false
  }
}

function descendants(element: Element, selector: string) {
  return querySelectorAll(element, selector).filter(
    (match) => match !== element
  )
}
// aliases:
const children = descendants

function ancestors(element: Element, selector: string) {
  const ancestors = []
  let parentNode = element.parentNode

  while (parentNode && parentNode !== document && isElement(parentNode)) {
    if (matchesSelector(parentNode as Element, selector)) {
      ancestors.push(parentNode)
    }
    parentNode = parentNode.parentNode
  }

  return ancestors
}
// aliases:
const parents = ancestors
const attribute = getAttribute

function style(element: Element, property: string) {
  return getComputedStyle(element).getPropertyValue(property)
}

function classNames(element: Element) {
  return Array.from(element.classList)
}

function matches(element: Element, selector: string | undefined) {
  return matchesSelector(element, selector)
}

//function bounds(element: Element) {
//  return getBoundingClientRect(element).property
//}

function checked(element: Element) {
  return (element as any).checked || getAttribute(element, 'aria-checked')
}

function selected(element: Element) {
  return (element as any).selected || getAttribute(element, 'aria-selected')
}

function disabled(element: Element) {
  return (
    getAttribute(element, 'disabled') || getAttribute(element, 'aria-disabled')
  )
}

function readonly(element: Element) {
  return (element as any).readonly || getAttribute(element, 'aria-readonly')
}

function role(element: Element) {
  return getAttribute(element, 'role')
}

function value(element: Element): string | null {
  return (element as any).value
}

function label(element: Element) {
  const doc = getOwnerDocument(element)
  if (matchesSelector(element, '[aria-label]')) {
    return getAttribute(element, 'aria-label')
  } else if (matchesSelector(element, '[aria-labelledby]')) {
    const ids = getAttribute(element, 'aria-labelledby')!.split(/\s+/)
    const labels = ids.map((id) => doc.getElementById(id))
    return labels.map((label) => (label ? label.textContent : '')).join(' ')
  } else if (
    matchesSelector(element, 'button, a[href], [role="button"], [role="link"]')
  ) {
    return getTextContent(element)
  } else if (matchesSelector(element, 'fieldset')) {
    const legend = querySelector(element, 'legend')
    if (legend) {
      return getTextContent(legend)
    }
  } else if (matchesSelector(element, '[id]')) {
    const labels = Array.from(
      querySelectorAll(doc, `[for="${getAttribute(element, 'id')}"]`)
    )
    return labels.map((label) => (label ? label.textContent : '')).join(' ')
  } else if (matchesSelector(element, 'input,textarea,select')) {
    const labels = ancestors(element, 'label')
    if (labels.length > 0) {
      return getTextContent(labels[0] as Element)
    }
  }
  return undefined
}

function title(element: Element) {
  if (matchesSelector(element, '[title]')) {
    return getAttribute(element, 'title')
  } else if (matchesSelector(element, 'svg')) {
    const title = querySelector(element, 'title')
    if (title) {
      return getTextContent(title)
    }
  }
  return undefined
}

export {
  toString,
  getId,
  getOwnerWindow,
  getOwnerDocument,
  getComputedStyle,
  getTagName,
  tagName,
  typeIn,
  getAttribute,
  getDOMNode,
  node,
  debug,
  accessible,
  getTextContent,
  getParentNode,
  parent,
  getBoundingClientRect,
  rect,
  hasClass,
  containsFocus,
  focused,
  visible,
  focusable,
  tabbable,
  clickable,
  onscreen,
  exists,
  text,
  empty,
  contains,
  descendants,
  ancestors,
  attribute,
  style,
  classNames,
  id,
  matches,
  checked,
  selected,
  disabled,
  readonly,
  role,
  value,
  label,
  title,
  children,
  parents
}

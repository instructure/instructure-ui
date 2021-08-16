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

import { findDOMNode } from './findDOMNode'
import { canUseDOM } from './canUseDOM'
import { contains } from './contains'
import { ownerDocument } from './ownerDocument'
import { UIElement } from '@instructure/shared-types'

type RectType = {
  top: number
  bottom: number
  left: number
  right: number
  height: number
  width: number
}

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Gets the bounding rectangle of an element
 * @module getBoundingClientRect
 *
 * @param { Node | Window | React.ReactElement | React.Component | function | null } el - component, DOM node, or function returning a DOM node
 * @return {object} rect - object with top, left coords and height and width
 */
function getBoundingClientRect(el?: UIElement) {
  const rect: RectType = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    width: 0
  }

  if (!canUseDOM) {
    return rect
  }

  const node = el && findDOMNode(el)

  if (!node) {
    return rect
  }

  if (node === window) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset,
      width: window.innerWidth,
      height: window.innerHeight,
      right: window.innerWidth + window.pageXOffset,
      bottom: window.innerHeight + window.pageYOffset
    } as RectType
  }

  const doc = el === document ? document : ownerDocument(node)
  const docEl = doc && doc.documentElement

  if (!docEl || !contains(docEl, node)) {
    return rect
  }

  const boundingRect = (node as Element).getBoundingClientRect()

  let k: keyof RectType

  for (k in rect) {
    rect[k] = boundingRect[k]
  }

  if (doc !== document && doc.defaultView) {
    const frameElement = doc.defaultView.frameElement
    if (frameElement) {
      const frameRect = getBoundingClientRect(frameElement)
      rect.top += frameRect.top
      rect.bottom += frameRect.top
      rect.left += frameRect.left
      rect.right += frameRect.left
    }
  }

  return {
    top:
      rect.top +
      (window.pageYOffset || docEl.scrollTop) -
      (docEl.clientTop || 0),
    left:
      rect.left +
      (window.pageXOffset || docEl.scrollLeft) -
      (docEl.clientLeft || 0),
    // TODO: find out when width and height can be null, might be an old IE hack
    width:
      (rect.width == null ? (node as HTMLElement).offsetWidth : rect.width) ||
      0,
    height:
      (rect.height == null
        ? (node as HTMLElement).offsetHeight
        : rect.height) || 0,
    right: doc.body.clientWidth - rect.width - rect.left,
    bottom: doc.body.clientHeight - rect.height - rect.top
  } as RectType
}

export default getBoundingClientRect
export { getBoundingClientRect }
export type { RectType }

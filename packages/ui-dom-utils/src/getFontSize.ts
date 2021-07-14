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
import { canUseDOM } from './canUseDOM'
import { ownerDocument } from './ownerDocument'
import { getComputedStyle } from './getComputedStyle'
import React from 'react'

const COMPUTED_CACHE: WeakMap<any, number> = new WeakMap()

/**
 * ---
 * category: utilities/DOM
 * ---
 *
 * Gets font size in px
 *
 * @module getFontSize
 * @param { Node | Window | React.ReactElement | React.Component | function | undefined | null } el - component or DOM node
 * @param { boolean } ignoreCache
 * @returns { number } font size in px
 */
function getFontSize(
  el?:
    | Node
    | Window
    | React.ReactElement
    | React.Component
    | ((...args: any[]) => any)
    | null,
  ignoreCache = false
) {
  if (!canUseDOM) {
    return 16
  }

  const container = el || ownerDocument(el).documentElement

  // return the cached font size if it's there
  const cachedValue = COMPUTED_CACHE.get(container)
  if (!ignoreCache && cachedValue) {
    return cachedValue
  }

  const fontSize = parseInt(
    (getComputedStyle(container) as CSSStyleDeclaration).getPropertyValue(
      'font-size'
    )
  )

  // cache the computed font size so that we don't have to compute it again
  COMPUTED_CACHE.set(container, fontSize)

  return fontSize
}

export default getFontSize
export { getFontSize }

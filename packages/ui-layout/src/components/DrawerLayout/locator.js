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

import {
  findByQuery,
  locator,
  querySelectorAll
} from '@instructure/ui-test-utils'

import DrawerLayout, { DrawerContent, DrawerTray } from './index'

export const DrawerContentLocator = locator(DrawerContent.displayName)
export const DrawerTrayLocator = locator(DrawerTray.displayName)

const query = (ComponentIdentifier, element, selector, options) => {
  if (element instanceof Element) {
    const id = element.getAttribute(DrawerLayout.locatorAttribute)
    return querySelectorAll(
      document.body,
      { css: `[${ComponentIdentifier.locatorAttribute}="${id}"]` },
    )
  } else {
    return []
  }
}

const trayQuery = query.bind(null, DrawerTray)

const DrawerLayoutLocator = locator(DrawerLayout.displayName, {
  findContent: (...args) => {
    return DrawerContentLocator.find(...args)
  },
  findTray: (...args) => {
    return findByQuery(trayQuery, ...args)
  }
})

DrawerLayoutLocator.trayQuery = trayQuery

export default DrawerLayoutLocator

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
import { locator } from '@instructure/ui-test-locator'
import { Position } from './index'

import { PositionContentLocator } from './PositionContentLocator'
import { PositionTargetLocator } from './PositionTargetLocator'

export const customMethods = {
  findTarget: (element: Element, ...args: any) => {
    if (element && element.getAttribute) {
      const id = element.getAttribute(Position.locatorAttribute)
      return locator(`[${Position.targetLocatorAttribute}="${id}"]`).find(
        ...args
      )
    }
    throw new Error('Element ' + element + ' not found')
  },
  findContent: (element: Element, ...args: any) => {
    if (element && element.getAttribute) {
      const id = element.getAttribute(Position.locatorAttribute)
      return locator(`[${Position.contentLocatorAttribute}="${id}"]`).find(
        ...args
      )
    }
    throw new Error('Element ' + element + ' not found')
  }
}

export { PositionContentLocator }
export { PositionTargetLocator }

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
export const PositionLocator = locator(Position.selector, customMethods)

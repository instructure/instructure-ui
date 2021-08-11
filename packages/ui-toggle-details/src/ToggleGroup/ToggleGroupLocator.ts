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

import { ToggleGroup } from './index'

const ToggleLocator = locator('[aria-expanded][aria-controls]')

export const customMethods = {
  clickToggle: async (element: any, ...args: any[]) => {
    return (await ToggleLocator.find(element)).click(...args)
  },
  findToggle: async (...args: any[]) => {
    return ToggleLocator.find(...args)
  },
  findContent: async (element: any, ...args: any[]) => {
    const toggle = await ToggleLocator.find(element)
    if (toggle) {
      return locator(`#${toggle.getAttribute('aria-controls')}`).find(...args)
    } else {
      return null
    }
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
export const ToggleGroupLocator = locator(ToggleGroup.selector, customMethods)

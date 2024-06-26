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

/* eslint-disable no-restricted-imports */
// @ts-ignore: Cannot find module
import { OptionsLocator } from '@instructure/ui-options/es/Options/OptionsLocator'
// @ts-ignore: Cannot find module
import { PopoverLocator } from '@instructure/ui-popover/es/Popover/PopoverLocator'
/* eslint-enable no-restricted-imports */

import { Select } from './index'

// @ts-ignore: property 'selector' does not exist on typeof Select
export const SelectLocator = locator(Select.selector, {
  findInput: (...args: any[]) => locator('input').find(...args),

  findOptionsList: async (element: any, ...args: any[]) => {
    const content = await PopoverLocator.findContent(element, ...args)
    return content ? OptionsLocator.find(content.getDOMNode()) : null
  }
})

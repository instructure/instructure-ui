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

import { locator } from '@instructure/ui-test-utils'

import { FileDrop } from './index'

const fileInputLocator = locator('input[type="file"]')

export default locator(FileDrop.selector, {
  // the file input isn't visible in this component,
  // so we need special locator methods to interact w/ it
  click: async (element, init, options) => {
    const input = await fileInputLocator.find(element, { visible: false })
    return input.click(init, { ...options, clickable: false })
  },
  keyUp: async (element, whichKey, init, options) => {
    const input = await fileInputLocator.find(element, { visible: false })
    return input.keyUp(whichKey, init, { ...options, clickable: false })
  },
  keyDown: async (element, whichKey, init, options) => {
    const input = await fileInputLocator.find(element, { visible: false })
    return input.keyDown(whichKey, init, { ...options, clickable: false })
  }
})

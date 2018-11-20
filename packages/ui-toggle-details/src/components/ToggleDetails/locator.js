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
  locator,
  querySelectorAll,
  findByQuery
} from '@instructure/ui-test-utils'

import ToggleDetails from './index'

const ToggleLocator = locator('[aria-expanded]')

const contentQuery = (element, selector, options) => {
  const toggle = ToggleLocator.query(element)
  if (toggle && toggle.getAttribute) {
    const contentId = toggle.getAttribute('aria-controls')
    return querySelectorAll(element, `#${contentId}`, options)
  }
  return []
}

export default locator(ToggleDetails.selector, {
  clickToggle: async (element, ...args) => {
    return (await ToggleLocator.find(element)).click(...args)
  },
  findToggle: (...args) => {
    return ToggleLocator.find(...args)
  },
  findContent: (...args) => {
    return findByQuery(contentQuery, ...args)
  }
})

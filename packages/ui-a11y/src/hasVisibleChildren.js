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

import React from 'react'
import { matchComponentTypes } from '@instructure/ui-react-utils'
import { warn } from '@instructure/console'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

/**
 * ---
 * category: utilities/deprecated
 * id: deprecatedHasVisibleChildren
 * ---
 * Returns `true` if any of the children are not wrapped with [ScreenReaderContent](#ScreenReaderContent).
 * @param {ReactChildren} children - A react component's children prop
 * @return {boolean} whether any of the children are visible
 */
function hasVisibleChildren (children) {
  warn(false, '[hasVisibleChildren] is deprecated. It has been moved from `@instructure/ui-a11y` to `@instructure/ui-a11y-utils`')

  let visible = false

  React.Children.forEach(children, (child) => {
    if (child && !matchComponentTypes(child, [ScreenReaderContent])) {
      visible = true
    }
  })

  return visible
}

export default hasVisibleChildren
export { hasVisibleChildren }

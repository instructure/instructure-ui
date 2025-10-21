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

import { createContext } from 'react'
import { getTextDirection } from './getTextDirection'

/**
 * ---
 * category: utilities/i18n
 * ---
 *
 * This React context the text direction. I can have 2 values:
 * `ltr`, `rtl`. Its default value is the document's `dir` value, if
 * this is not given then `ltr`. For more info on the values see
 * [mdn](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir).
 * If its set to `ltr` or `rtl` then some InstUI components (e.g.
 * [DrawerLayout](DrawerLayout) will automatically orient based on its value.
 *
 * @module TextDirectionContext
 */
const TextDirectionContext = createContext(getTextDirection() || 'ltr')

const DIRECTION = {
  ltr: 'ltr',
  rtl: 'rtl'
}

export default TextDirectionContext
export { TextDirectionContext, DIRECTION }

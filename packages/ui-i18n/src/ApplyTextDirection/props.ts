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

import { AsElementType } from '@instructure/shared-types'

type DirValues = 'ltr' | 'rtl' | 'auto'

export type ApplyTextDirectionProps = {
  /**
   * The direction value to use. For values and their effects see
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir
   */
  dir?: DirValues
  /**
   * The children of this component. Either a React node or a function
   * that receives 2 parameters (text direction, is rtl direction?) and
   * returns a React node
   */
  children?:
    | React.ReactNode
    | ((dir: DirValues, isRtl: boolean) => React.ReactNode)
  as?: AsElementType
}

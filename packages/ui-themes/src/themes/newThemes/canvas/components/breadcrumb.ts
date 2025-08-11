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

import semantics from '../semantics.js'
import type { Semantics } from '../semantics.js'

export type Breadcrumb = {
  fontFamily: Semantics['fontFamily']['base']
  largeFontSize: string
  largeSeparatorFontSize: Semantics['size']['icon']['md']
  mediumFontSize: Semantics['fontSize']['textBase']
  mediumSeparatorFontSize: Semantics['size']['icon']['sm']
  separatorColor: Semantics['icon']['muted']
  smallFontSize: Semantics['fontSize']['textSm']
  smallSeparatorFontSize: Semantics['size']['icon']['xs']
}

const breadcrumb: Breadcrumb = {
  fontFamily: semantics.fontFamily.base,
  largeFontSize: '22px',
  largeSeparatorFontSize: semantics.size.icon.md,
  mediumFontSize: semantics.fontSize.textBase,
  mediumSeparatorFontSize: semantics.size.icon.sm,
  separatorColor: semantics.icon.muted,
  smallFontSize: semantics.fontSize.textSm,
  smallSeparatorFontSize: semantics.size.icon.xs
}
export default breadcrumb

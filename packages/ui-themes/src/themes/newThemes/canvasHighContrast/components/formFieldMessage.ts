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

export type FormFieldMessage = {
  hintText: Semantics['text']['base']
  errorText: Semantics['text']['error']
  errorIcon: Semantics['icon']['error']
  successText: Semantics['text']['success']
  fontWeight: Semantics['fontWeight']['body']['base']
  fontSize: Semantics['fontSize']['textSm']
  lineHeight: Semantics['lineHeight']['paragraph']['textSm']
  errorIconMarginRight: Semantics['spacing']['xs']
}

const formFieldMessage: FormFieldMessage = {
  hintText: semantics.text.base,
  errorText: semantics.text.error,
  errorIcon: semantics.icon.error,
  successText: semantics.text.success,
  fontWeight: semantics.fontWeight.body.base,
  fontSize: semantics.fontSize.textSm,
  lineHeight: semantics.lineHeight.paragraph.textSm,
  errorIconMarginRight: semantics.spacing.xs
}
export default formFieldMessage

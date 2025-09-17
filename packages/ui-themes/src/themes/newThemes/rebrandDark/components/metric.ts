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

export type Metric = {
  labelColor: Semantics['text']['muted']
  labelFontSize: Semantics['fontSize']['textXs']
  paddingHorizontal: Semantics['spacing']['sm']
  valueColor: Semantics['text']['base']
  valueFontSize: Semantics['fontSize']['text2xl']
  spaceBetweenTexts: Semantics['spacing']['sm']
  labelLineHeight: Semantics['lineHeight']['standalone']['textXs']
  valueLineHeight: Semantics['lineHeight']['standalone']['text2xl']
}

const metric: Metric = {
  labelColor: semantics.text.muted,
  labelFontSize: semantics.fontSize.textXs,
  paddingHorizontal: semantics.spacing.sm,
  valueColor: semantics.text.base,
  valueFontSize: semantics.fontSize.text2xl,
  spaceBetweenTexts: semantics.spacing.sm,
  labelLineHeight: semantics.lineHeight.standalone.textXs,
  valueLineHeight: semantics.lineHeight.standalone.text2xl
}
export default metric

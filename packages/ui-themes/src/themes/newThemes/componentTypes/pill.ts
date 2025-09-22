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

import type { Semantics } from '../canvas/semantics'

export type Pill = {
  paddingHorizontal: Semantics['spacing']['spaceSm']
  height: string
  backgroundColor: Semantics['background']['base']
  textFontSize: Semantics['fontSize']['textSm']
  textFontWeight: Semantics['fontWeight']['body']['base']
  statusLabelFontWeight: Semantics['fontWeight']['body']['strong']
  maxWidth: string
  baseTextColor: Semantics['text']['base']
  baseIconColor: Semantics['icon']['base']
  baseBorderColor: Semantics['stroke']['base']
  infoTextColor: Semantics['text']['info']
  infoIconColor: Semantics['icon']['info']
  infoBorderColor: Semantics['stroke']['info']
  errorTextColor: Semantics['text']['error']
  errorIconColor: Semantics['icon']['error']
  errorBorderColor: Semantics['stroke']['error']
  successTextColor: Semantics['text']['success']
  successIconColor: Semantics['icon']['success']
  successBorder: Semantics['stroke']['success']
  warningTextColor: Semantics['text']['warning']
  warningIcon: Semantics['icon']['warning']
  warningBorder: Semantics['stroke']['warning']
  borderRadius: Semantics['borderRadius']['full']
  borderWidth: Semantics['borderWidth']['sm']
  borderStyle: { style: string }
  lineHeight: Semantics['lineHeight']['standalone']['textSm']
  iconSize: Semantics['size']['icon']['sm']
}

export default Pill

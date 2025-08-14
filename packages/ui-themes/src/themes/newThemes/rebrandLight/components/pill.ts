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

export type Pill = {
  paddingHorizontal: Semantics['space']['sm']
  height: string
  background: Semantics['background']['base']
  textFontSize: Semantics['fontSize']['textSm']
  textFontWeight: Semantics['fontWeight']['body']['base']
  statusLabelFontWeight: Semantics['fontWeight']['body']['strong']
  maxWidth: string
  primaryText: Semantics['text']['base']
  primaryIcon: Semantics['icon']['base']
  primaryBorder: Semantics['stroke']['base']
  infoText: Semantics['text']['info']
  infoIcon: Semantics['icon']['info']
  infoBorder: Semantics['stroke']['info']
  errorText: Semantics['text']['error']
  errorIcon: Semantics['icon']['error']
  errorBorder: Semantics['stroke']['error']
  successText: Semantics['text']['success']
  successIcon: Semantics['icon']['success']
  successBorder: Semantics['stroke']['success']
  warningText: Semantics['text']['warning']
  warningIcon: Semantics['icon']['warning']
  warningBorder: Semantics['stroke']['warning']
  borderRadius: Semantics['borderRadius']['full']
  borderWidth: Semantics['borderWidth']['sm']
  borderStyle: { style: string }
  lineHeight: Semantics['lineHeight']['standalone']['textSm']
  iconSize: Semantics['size']['icon']['sm']
}

const pill: Pill = {
  paddingHorizontal: semantics.space.sm,
  height: '24px',
  background: semantics.background.base,
  textFontSize: semantics.fontSize.textSm,
  textFontWeight: semantics.fontWeight.body.base,
  statusLabelFontWeight: semantics.fontWeight.body.strong,
  maxWidth: '240px',
  primaryText: semantics.text.base,
  primaryIcon: semantics.icon.base,
  primaryBorder: semantics.stroke.base,
  infoText: semantics.text.info,
  infoIcon: semantics.icon.info,
  infoBorder: semantics.stroke.info,
  errorText: semantics.text.error,
  errorIcon: semantics.icon.error,
  errorBorder: semantics.stroke.error,
  successText: semantics.text.success,
  successIcon: semantics.icon.success,
  successBorder: semantics.stroke.success,
  warningText: semantics.text.warning,
  warningIcon: semantics.icon.warning,
  warningBorder: semantics.stroke.warning,
  borderRadius: semantics.borderRadius.full,
  borderWidth: semantics.borderWidth.sm,
  borderStyle: { style: 'solid' },
  lineHeight: semantics.lineHeight.standalone.textSm,
  iconSize: semantics.size.icon.sm
}
export default pill

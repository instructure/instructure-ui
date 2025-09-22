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
import type { Pill } from '../../componentTypes/pill.js'

const pill: Pill = {
  paddingHorizontal: semantics.spacing.spaceSm,
  height: '24px',
  backgroundColor: semantics.background.base,
  textFontSize: semantics.fontSize.textSm,
  textFontWeight: semantics.fontWeight.body.base,
  statusLabelFontWeight: semantics.fontWeight.body.strong,
  maxWidth: '240px',
  baseTextColor: semantics.text.base,
  baseIconColor: semantics.icon.base,
  baseBorderColor: semantics.stroke.base,
  infoTextColor: semantics.text.info,
  infoIconColor: semantics.icon.info,
  infoBorderColor: semantics.stroke.info,
  errorTextColor: semantics.text.error,
  errorIconColor: semantics.icon.error,
  errorBorderColor: semantics.stroke.error,
  successTextColor: semantics.text.success,
  successIconColor: semantics.icon.success,
  successBorder: semantics.stroke.success,
  warningTextColor: semantics.text.warning,
  warningIcon: semantics.icon.warning,
  warningBorder: semantics.stroke.warning,
  borderRadius: semantics.borderRadius.full,
  borderWidth: semantics.borderWidth.sm,
  borderStyle: { style: 'solid' },
  lineHeight: semantics.lineHeight.standalone.textSm,
  iconSize: semantics.size.icon.sm
}
export default pill

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

import type { SemanticsCanvas as Semantics } from '../../semantics'

const pill = (semantic: Semantics) => ({
  paddingHorizontal: semantic.spacing.spaceSm,
  height: '24px',
  backgroundColor: semantic.color.background.base,
  textFontSize: semantic.fontSize.textSm,
  textFontWeight: semantic.fontWeight.body.base,
  statusLabelFontWeight: semantic.fontWeight.body.strong,
  maxWidth: '240px',
  baseTextColor: semantic.color.text.base,
  baseBorderColor: semantic.color.stroke.base,
  infoTextColor: semantic.color.text.info,
  infoBorderColor: semantic.color.stroke.info,
  errorTextColor: semantic.color.text.error,
  errorBorderColor: semantic.color.stroke.error,
  successTextColor: semantic.color.text.success,
  successBorderColor: semantic.color.stroke.success,
  warningTextColor: semantic.color.text.warning,
  warningBorderColor: semantic.color.stroke.warning,
  borderRadius: semantic.borderRadius.full,
  borderWidth: semantic.borderWidth.sm,
  lineHeight: semantic.lineHeight.standalone.textSm,
  fontFamily: semantic.fontFamily.base,
  borderStyle: 'solid'
})
export default pill

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

import type { Alert } from '../../componentTypes/alert'
import type { Semantics } from '../semantics'

const alert = (semantics: Semantics): Alert => ({
  background: semantics.color.background.elevatedSurface.base,
  borderRadius: semantics.borderRadius.lg,
  borderStyle: 'solid',
  borderWidth: semantics.borderWidth.md,
  closeButtonMarginRight: '0.5rem',
  closeButtonMarginTop: '0.5rem',
  color: semantics.color.text.base,
  contentFontFamily: semantics.fontFamily.base,
  contentFontSize: semantics.fontSize.textBase,
  contentFontWeight: semantics.fontWeight.body.base,
  contentLineHeight: semantics.lineHeight.standalone.base,
  dangerBorderColor: semantics.color.stroke.error,
  dangerIconBackground: semantics.color.background.error,
  iconColor: semantics.color.icon.onColor,
  infoBorderColor: semantics.color.stroke.info,
  infoIconBackground: semantics.color.background.info,
  successBorderColor: semantics.color.stroke.success,
  successIconBackground: semantics.color.background.success,
  warningBorderColor: semantics.color.stroke.warning,
  warningIconBackground: semantics.color.background.warning,
  contentPaddingVertical: semantics.spacing.spaceMd,
  contentPaddingHorizontal: semantics.spacing.spaceXl
})
export default alert

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

const alert = (semantic: Semantics) => ({
  background: semantic.color.background.elevatedSurface.base,
  borderRadius: semantic.borderRadius.lg,
  borderStyle: 'solid',
  borderWidth: semantic.borderWidth.md,
  closeButtonMarginRight: '0.5rem',
  closeButtonMarginTop: '0.5rem',
  color: semantic.color.institutional.brandFontColorDark,
  contentFontFamily: semantic.fontFamily.base,
  contentFontSize: semantic.fontSize.textBase,
  contentFontWeight: semantic.fontWeight.body.base,
  contentLineHeight: semantic.lineHeight.standalone.base,
  dangerBorderColor: semantic.color.stroke.error,
  dangerIconBackground: semantic.color.background.error,
  iconColor: semantic.color.icon.onColor,
  infoBorderColor: semantic.color.stroke.info,
  infoIconBackground: semantic.color.background.info,
  successBorderColor: semantic.color.stroke.success,
  successIconBackground: semantic.color.background.success,
  warningBorderColor: semantic.color.stroke.warning,
  warningIconBackground: semantic.color.background.warning,
  contentPaddingVertical: semantic.spacing.spaceMd,
  contentPaddingHorizontal: semantic.spacing.spaceXl
})
export default alert

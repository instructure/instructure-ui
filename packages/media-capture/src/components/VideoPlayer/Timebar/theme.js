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
import { alpha } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, borders, spacing, typography }) {
  return {
    backgroundColor: alpha(colors.backgroundDarkest, 80),
    bufferedBackgroundColor: alpha(colors.oxford, 80),
    progressBackgroundColor: alpha(colors.backgroundBrand, 90),
    focusOutlineColor: colors.borderBrand,
    focusOutlineWeight: borders.widthMedium,
    timestampFontWeight: typography.fontWeightLight,
    timestampColor: colors.textLightest,
    timestampFontSize: typography.fontSizeXSmall,
    timestampPadding: `0 ${spacing.xSmall}`,
    tooltipTop: '-1.65rem',
    tooltipPadding: `${spacing.xxxSmall} ${spacing.xxSmall}`,
    tooltipFontWeight: typography.fontWeightLight,
    tooltipBackgroundColor: colors.backgroundBrand,
    tooltipColor: colors.textLightest,
    tooltipCaretSize: spacing.xxSmall,
    tooltipFontSize: typography.fontSizeXSmall,
    tooltipLineWidth: borders.widthMedium
  }
}

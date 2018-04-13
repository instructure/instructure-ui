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

import { darken } from '@instructure/ui-themeable/lib/utils/color'

export default function ({ colors, borders, spacing, typography, stacking }) {
  return {
    fontFamily: typography.fontFamilyMonospace,
    fontSize: typography.fontSizeSmall,
    background: colors.backgroundLight,
    border: `${borders.widthSmall} solid ${colors.borderLight}`,
    borderRadius: borders.radiusMedium,
    focusBorderColor: colors.borderBrand,
    focusBoxShadow: `inset 0 0 0 1px ${colors.borderLightest}`,
    horizontalPadding: spacing.xSmall,
    verticalPadding: spacing.xxSmall,
    color: colors.textDarkest,
    lineNumberColor: colors.textDark,
    gutterBorder: colors.borderLight,
    gutterBackground: darken(colors.backgroundLight, 5),
    gutterMarkerColor: colors.textBrand,
    gutterMarkerSubtleColor: colors.textDark,
    cursorColor: colors.textDarkest,
    secondaryCursorColor: colors.textDark,
    rulerColor: colors.borderDark,
    matchingBracketOutline: colors.textDark,
    nonMatchingBracketColor: colors.textDanger,
    matchingTagBackground: 'rgba(255, 150, 0, 0.3)',
    activeLineBackground: darken(colors.backgroundLight, 5),
    selectedBackground: darken(colors.backgroundLight, 15),
    fatCursorBackground: colors.backgroundSuccess,
    fatCursorMarkBackground: 'rgba(20, 255, 20, 0.5)',
    searchingBackground: 'rgba(255, 255, 0, 0.4)',
    zIndex: stacking.above,

    quoteColor: colors.textSuccess,
    headerColor: colors.textWarning,
    negativeColor: colors.textDanger,
    positiveColor: colors.textSuccess,
    keywordColor: colors.textBrand,
    atomColor: colors.textWarning,
    numberColor: colors.textWarning,
    defColor: colors.textDarkest,
    variableColor: colors.textBrand,
    secondaryVariableColor: colors.textWarning,
    typeColor: colors.textBrand,
    commentColor: colors.textDark,
    stringColor: colors.textBrand,
    secondaryStringColor: colors.textDanger,
    metaColor: colors.textDarkest,
    qualifierColor: colors.textSuccess,
    builtInColor: colors.textWarning,
    bracketColor: colors.borderDark,
    tagColor: colors.textSuccess,
    attributeColor: colors.textBrand,
    hrColor: colors.borderDark,
    linkColor: colors.textBrand,
    errorColor: colors.textDanger,
    propertyColor: colors.textAlert,
    nodeColor: colors.textWarning,
    operatorColor: colors.textDarkest
  }
}

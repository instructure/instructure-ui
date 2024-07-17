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

import type { Theme } from '@instructure/ui-themes'
import { CodeEditorTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): CodeEditorTheme => {
  const { colors, borders, spacing, typography, stacking } = theme

  const componentVariables: CodeEditorTheme = {
    fontFamily: typography?.fontFamilyMonospace,
    fontSize: typography?.fontSizeSmall,
    background: colors?.contrasts?.grey1111,
    border: `${borders?.widthSmall} solid ${colors?.contrasts?.grey1111}`,
    borderRadius: borders?.radiusMedium,
    focusBorderColor: colors?.contrasts?.blue4570,
    focusBoxShadow: `inset 0 0 0 1px ${colors?.contrasts?.white1010}`,
    horizontalPadding: spacing?.xSmall,
    verticalPadding: spacing?.xxSmall,
    color: colors?.contrasts?.grey125125,
    lineNumberColor: colors?.contrasts?.grey4570,
    gutterBorder: colors?.contrasts?.grey1111,
    gutterBackground: colors?.contrasts?.grey1214,
    gutterMarkerColor: colors?.contrasts?.blue4570,
    gutterMarkerSubtleColor: colors?.contrasts?.grey4570,
    cursorColor: colors?.contrasts?.grey125125,
    secondaryCursorColor: colors?.contrasts?.grey4570,
    rulerColor: colors?.contrasts?.grey4570,
    matchingBracketOutline: colors?.contrasts?.grey4570,
    nonMatchingBracketColor: colors?.contrasts?.red4570,
    matchingTagBackground: 'rgba(255, 150, 0, 0.3)',
    activeLineBackground: colors?.contrasts?.grey1214,
    selectedBackground: colors?.contrasts?.grey2424,
    fatCursorBackground: colors?.contrasts?.green4570,
    fatCursorMarkBackground: 'rgba(20, 255, 20, 0.5)',
    searchingBackground: 'rgba(255, 255, 0, 0.4)',
    zIndex: stacking?.above,

    quoteColor: colors?.contrasts?.green4570,
    headerColor: colors?.contrasts?.orange4570,
    negativeColor: colors?.contrasts?.red4570,
    positiveColor: colors?.contrasts?.green4570,
    keywordColor: colors?.contrasts?.blue4570,
    atomColor: colors?.contrasts?.orange4570,
    numberColor: colors?.contrasts?.orange4570,
    defColor: colors?.contrasts?.grey125125,
    variableColor: colors?.contrasts?.blue4570,
    secondaryVariableColor: colors?.contrasts?.orange4570,
    typeColor: colors?.contrasts?.blue4570,
    commentColor: colors?.contrasts?.grey4570,
    stringColor: colors?.contrasts?.blue4570,
    secondaryStringColor: colors?.contrasts?.red4570,
    metaColor: colors?.contrasts?.grey125125,
    qualifierColor: colors?.contrasts?.green4570,
    builtInColor: colors?.contrasts?.orange4570,
    bracketColor: colors?.contrasts?.grey4570,
    tagColor: colors?.contrasts?.green4570,
    attributeColor: colors?.contrasts?.blue4570,
    hrColor: colors?.contrasts?.grey4570,
    linkColor: colors?.contrasts?.blue4570,
    errorColor: colors?.contrasts?.red4570,
    propertyColor: colors?.contrasts?.blue5782,
    nodeColor: colors?.contrasts?.orange4570,
    operatorColor: colors?.contrasts?.grey125125
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme

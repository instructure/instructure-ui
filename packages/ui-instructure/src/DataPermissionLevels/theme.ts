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
import type { DataPermissionLevelsTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): DataPermissionLevelsTheme => {
  const { colors, spacing, borders } = theme

  const componentVariables: DataPermissionLevelsTheme = {
    cardBorderRadius: borders?.radiusMedium,
    cardBorderColor: colors?.ui?.lineStroke,
    cardBorderWidth: borders?.widthMedium,
    cardPadding: spacing?.space12,
    cardExplainerContainerBottomMargin: spacing?.space8,
    cardGap: spacing?.modalElements,
    currentFeaturePaddingSides: spacing?.space12,
    currentFeaturePaddingTopBottom: spacing?.space8,
    permissionTitleBottomMargin: spacing?.space8,
    levelColor: colors?.contrasts?.violet5790,

    bodyPadding: spacing?.paddingCardLarge,

    aiTextLeftGradientColor: colors?.contrasts?.violet4570,
    aiTextRightGradientColor: colors?.contrasts?.sea4570
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme

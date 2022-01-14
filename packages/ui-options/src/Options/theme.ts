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
import type { OptionsTheme } from '@instructure/shared-types'

const optionsThemeKeys: (keyof OptionsTheme)[] = [
  'labelFontWeight',
  'background',
  'labelColor',
  'labelPadding',
  'nestedLabelPadding'
]

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): OptionsTheme => {
  const { colors, typography, spacing } = theme

  // TODO: if updated, update optionsThemeKeys array too
  const componentVariables: OptionsTheme = {
    labelFontWeight: typography?.fontWeightBold,

    background: colors?.backgroundLightest,
    labelColor: colors?.textDarkest,

    labelPadding: `${spacing?.xSmall} 0`,
    nestedLabelPadding: `${spacing?.xSmall} ${spacing?.small}`
  }

  return {
    ...componentVariables
  }
}

export { generateComponentTheme as optionsThemeGenerator, optionsThemeKeys }
export default generateComponentTheme

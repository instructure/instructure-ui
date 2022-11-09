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
import type { TopNavBarActionItemsTheme } from '@instructure/shared-types'

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme: Theme): TopNavBarActionItemsTheme => {
  const { typography, spacing, borders } = theme

  const componentVariables: TopNavBarActionItemsTheme = {
    smallViewportActionItemContainerMargin: spacing?.xxLarge,
    smallViewportActionItemContainerMaxWidth: '50%',

    smallViewportDropdownMenuActiveOptionFontWeight: typography?.fontWeightBold,
    smallViewportDropdownMenuActiveOptionIndicatorSpacing: '0.25rem',
    smallViewportDropdownMenuActiveOptionIndicatorWidth: borders?.widthMedium,
    smallViewportDropdownMenuActiveOptionIndicatorColor: 'currentColor'
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme

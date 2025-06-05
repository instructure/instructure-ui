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
import { CanvasTopNavTheme } from '@instructure/shared-types'

const generateComponentTheme = (theme: Theme): CanvasTopNavTheme => {
  const componentVariables: CanvasTopNavTheme = {
    optionBackgroundLti: theme?.colors?.contrasts?.grey1111,
    optionBackground: theme?.colors?.contrasts?.grey100100,
    optionHighlightedBackgroundLti: theme?.colors?.contrasts?.grey1214,
    optionHighlightedBackground: theme?.colors?.contrasts?.grey5782,
    optionColorLti: theme?.colors?.contrasts?.grey125125,
    optionColor: theme?.colors?.contrasts?.white1010,
    optionHighlightedLabelColorLti: theme?.colors?.contrasts?.grey125125,
    optionHighlightedLabelColor: theme?.colors?.contrasts?.white1010,
    drilldownBorderColorLti: theme?.colors?.contrasts?.grey1111,
    drilldownBorderColor: theme?.colors?.contrasts?.grey100100,
    optionSeparatorColor: theme?.colors?.contrasts?.grey1424,
    topNavBarItemColor: theme?.colors?.contrasts?.grey125125,
    topNavBarItemActiveIndicatorColor: theme?.colors?.contrasts?.grey125125
  }

  return {
    ...componentVariables
  }
}

export default generateComponentTheme

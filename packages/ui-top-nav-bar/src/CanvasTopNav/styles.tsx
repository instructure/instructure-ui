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
import type { CanvasTopNavProps, CanvasTopNavStyle } from './props'
import { CanvasTopNavTheme } from '@instructure/shared-types'

const generateStyle = (
  componentTheme: CanvasTopNavTheme,
  params: CanvasTopNavProps
): CanvasTopNavStyle => {
  const { lti } = params

  return {
    optionsOverride: {
      background: lti
        ? componentTheme.optionBackgroundLti
        : componentTheme.optionBackground,
      highlightedBackground: lti
        ? componentTheme.optionHighlightedBackgroundLti
        : componentTheme.optionHighlightedBackground,
      color: lti ? componentTheme.optionColorLti : componentTheme.optionColor,
      highlightedLabelColor: lti
        ? componentTheme.optionHighlightedLabelColorLti
        : componentTheme.optionHighlightedLabelColor,
      padding: '16px 12px',
      lineHeight: '1.5'
    },
    drilldownOverride: {
      borderColor: lti
        ? componentTheme.drilldownBorderColorLti
        : componentTheme.drilldownBorderColor
    },
    optionContainer: {
      label: 'canvasTopNavOptionContainer',
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    topNavBarItemOverride: {
      color: componentTheme.topNavBarItemColor,
      activeIndicatorColor: componentTheme.topNavBarItemActiveIndicatorColor
    },
    ltiIcon: {
      label: 'canvasTopNavLtiIcon',
      fontSize: '38px'
    },
    menuItems: {
      label: 'canvasTopNavMenuitems',
      display: 'flex',
      height: '50px'
    }
  }
}

export { generateStyle }

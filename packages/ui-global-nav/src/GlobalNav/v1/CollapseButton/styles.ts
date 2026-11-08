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

import type { NewComponentTypes } from '@instructure/ui-themes'
import type { CollapseButtonIconStyle, CollapseButtonStyle } from './props.js'

type StyleParams = {
  collapsed: boolean
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['CollapseButton']>,
  params: StyleParams
): CollapseButtonStyle => {
  const { collapsed } = params

  return {
    collapseButton: {
      label: 'collapseButton',
      display: 'flex',
      // the collapsed rail centers the button
      marginInlineEnd: collapsed ? 0 : componentTheme.rightMargin
    },
    iconButtonThemeOverride: {
      secondaryGhostHoverBackground: componentTheme.hoverBackgroundColor,
      secondaryGhostActiveBackground: componentTheme.activeBackgroundColor
    }
  }
}

/**
 * Generates the icon color from the `MainNavItem` tokens
 */
const generateIconStyle = (
  componentTheme: ReturnType<NewComponentTypes['MainNavItem']>
): CollapseButtonIconStyle => {
  return {
    // the default IconButton icon is unreadable on the dark legacy rail, and the
    // CollapseButton tokens have no icon color
    iconButtonThemeOverride: {
      secondaryGhostColor: componentTheme.fontColor
    }
  }
}

export default generateStyle
export { generateIconStyle }

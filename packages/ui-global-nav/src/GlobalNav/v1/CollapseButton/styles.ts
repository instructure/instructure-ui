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
import { calcBandFocusStyles } from '../utils/calcBandFocusStyles.js'
import type {
  CollapseButtonMainNavItemStyle,
  CollapseButtonSizeStyle,
  CollapseButtonStyle
} from './props.js'

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
      // the collapsed rail centers the button
      marginInlineEnd: collapsed ? 0 : componentTheme.rightMargin
    },
    button: {
      label: 'collapseButton__button',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      border: 'none',
      backgroundColor: componentTheme.backgroundColor,
      cursor: 'pointer',
      '&:hover': { backgroundColor: componentTheme.hoverBackgroundColor },
      '&:active': { backgroundColor: componentTheme.activeBackgroundColor }
    }
  }
}

/**
 * Generates the focus ring and the icon color from the `MainNavItem` tokens
 */
const generateMainNavItemStyle = (
  componentTheme: ReturnType<NewComponentTypes['MainNavItem']>
): CollapseButtonMainNavItemStyle => {
  return {
    button: {
      label: 'collapseButton__button',
      // CollapseButton has no focus color tokens
      ...calcBandFocusStyles(
        componentTheme.outerFocusOutlineColor,
        componentTheme.innerFocusOutlineColor
      )
    },
    icon: {
      label: 'collapseButton__icon',
      display: 'flex',
      // CollapseButton has no icon color token
      color: componentTheme.fontColor
    }
  }
}

/**
 * Generates the button size from the `BaseButton` tokens
 */
const generateSizeStyle = (
  componentTheme: ReturnType<NewComponentTypes['BaseButton']>
): CollapseButtonSizeStyle => {
  return {
    button: {
      label: 'collapseButton__button',
      // the size of a small IconButton, CollapseButton has no size tokens
      width: componentTheme.smallHeight,
      height: componentTheme.smallHeight,
      borderRadius: componentTheme.borderRadius
    }
  }
}

export default generateStyle
export { generateMainNavItemStyle, generateSizeStyle }

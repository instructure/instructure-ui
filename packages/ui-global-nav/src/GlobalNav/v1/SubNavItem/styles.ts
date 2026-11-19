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
import type { SubNavItemStyle } from './props.js'

type StyleParams = {
  current: boolean
  logout: boolean
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
  componentTheme: ReturnType<NewComponentTypes['SubNavItem']>,
  params: StyleParams
): SubNavItemStyle => {
  const { current, logout } = params

  return {
    item: {
      label: 'subNavItem',
      display: 'flex',
      alignItems: 'center',
      gap: componentTheme.gap,
      boxSizing: 'border-box',
      width: '100%',
      margin: 0,
      padding: componentTheme.padding,
      border: 'none',
      borderRadius: componentTheme.borderRadius,
      backgroundColor: current
        ? componentTheme.selectedBackgroundColor
        : componentTheme.backgroundColor,
      color: current
        ? componentTheme.selectedTextColor
        : logout
        ? componentTheme.logoutTextColor
        : componentTheme.textColor,
      fontFamily: componentTheme.fontFamily,
      fontSize: componentTheme.fontSize,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      textAlign: 'start',
      textDecoration: 'none',
      cursor: 'pointer',
      ...(current
        ? calcBandFocusStyles(
            componentTheme.selectedOuterFocusOutlineColor,
            componentTheme.selectedInnerFocusOutlineColor
          )
        : calcBandFocusStyles(
            componentTheme.outerFocusOutlineColor,
            componentTheme.innerFocusOutlineColor
          )),
      '&:hover': {
        // a page-wide a:hover rule is more specific than the base class
        textDecoration: 'none',
        ...(!current && {
          backgroundColor: componentTheme.hoverBackgroundColor,
          color: logout
            ? componentTheme.logoutTextColor
            : componentTheme.hoverTextColor
        })
      },
      ...(!current && {
        '&:active': {
          backgroundColor: componentTheme.activeBackgroundColor,
          color: logout
            ? componentTheme.logoutTextColor
            : componentTheme.activeTextColor
        }
      })
    },
    icon: {
      label: 'subNavItem__icon',
      display: 'flex',
      flexShrink: 0,
      // SubNavItem has no logout icon color token
      color: current
        ? componentTheme.selectedIconColor
        : logout
        ? componentTheme.logoutTextColor
        : componentTheme.iconColor
    },
    label: {
      label: 'subNavItem__label',
      flex: 1
    },
    chevron: {
      label: 'subNavItem__chevron',
      display: 'flex',
      flexShrink: 0
    }
  }
}

export default generateStyle

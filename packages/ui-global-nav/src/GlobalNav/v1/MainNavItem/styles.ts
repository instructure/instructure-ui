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
import type { MainNavItemStyle } from './props.js'

type StyleParams = {
  collapsed: boolean
  current: boolean
  open: boolean
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
  componentTheme: ReturnType<NewComponentTypes['MainNavItem']>,
  params: StyleParams
): MainNavItemStyle => {
  const { collapsed, current, open } = params

  return {
    item: {
      label: 'mainNavItem',
      display: 'flex',
      alignItems: 'center',
      // MainNavItem has no gap token
      gap: componentTheme.horizontalPadding,
      boxSizing: 'border-box',
      width: collapsed ? componentTheme.minimizedItemSize : '100%',
      height: collapsed ? componentTheme.minimizedItemSize : undefined,
      justifyContent: collapsed ? 'center' : undefined,
      margin: 0,
      padding: collapsed
        ? 0
        : `${componentTheme.verticalPadding} ${componentTheme.horizontalPadding}`,
      border: 'none',
      borderRadius: componentTheme.borderRadius,
      backgroundColor: current
        ? componentTheme.currentBackgroundColor
        : open
        ? componentTheme.activeBackgroundColor
        : componentTheme.backgroundColor,
      color: current
        ? componentTheme.currentTextColor
        : componentTheme.fontColor,
      fontFamily: componentTheme.fontFamily,
      fontSize: componentTheme.fontSize,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      textAlign: 'start',
      textDecoration: componentTheme.linkTextDecoration,
      cursor: 'pointer',
      '&:hover': {
        // a page-wide a:hover rule is more specific than the base class
        textDecoration: componentTheme.linkTextDecoration,
        ...(!current &&
          !open && { backgroundColor: componentTheme.hoverBackgroundColor })
      },
      ...(!current &&
        !open && {
          '&:active': {
            backgroundColor: componentTheme.activeBackgroundColor
          }
        }),
      // same focus ring as SideNavBarItem, which has the same focus tokens
      '&:focus': {
        outline: 'none',
        boxShadow: current
          ? `inset 0 0 0 0.125rem ${componentTheme.selectedOuterFocusOutlineColor}, inset 0 0 0 0.25rem ${componentTheme.selectedInnerFocusOutlineColor}`
          : `inset 0 0 0 0.125rem ${componentTheme.outerFocusOutlineColor}, inset 0 0 0 0.25rem ${componentTheme.innerFocusOutlineColor}`
      }
    },
    icon: {
      label: 'mainNavItem__icon',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      height: componentTheme.iconWrapperHeight
    },
    label: {
      label: 'mainNavItem__label',
      flex: 1
    },
    chevron: {
      label: 'mainNavItem__chevron',
      display: 'flex',
      flexShrink: 0
    },
    tooltipTrigger: {
      label: 'mainNavItem__tooltipTrigger',
      display: 'block'
    }
  }
}

export default generateStyle

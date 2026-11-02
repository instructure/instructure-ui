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

import { calcFocusOutlineStyles } from '@instructure/emotion'
import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import type { SubNavItemStyle } from './props.js'

type StyleParams = {
  current: boolean
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @param sharedTokens Shared token object that stores common values for the theme.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['SubNavItem']>,
  params: StyleParams,
  sharedTokens: SharedTokens
): SubNavItemStyle => {
  const { current } = params

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
        : componentTheme.textColor,
      // SubNavItem has no font tokens, and buttons don't inherit the font by default
      font: 'inherit',
      textAlign: 'start',
      textDecoration: 'none',
      cursor: 'pointer',
      ...calcFocusOutlineStyles(
        {
          ...sharedTokens.focusOutline,
          // the `inset` token is 0, so the ring would sit outside the item, where the scrolling panel body clips it
          inset: `calc(-1 * ${sharedTokens.focusOutline.width})`
        },
        { focusPosition: 'inset' }
      ),
      '&:hover': {
        // a page-wide a:hover rule is more specific than the base class
        textDecoration: 'none',
        ...(!current && {
          backgroundColor: componentTheme.hoverBackgroundColor,
          color: componentTheme.hoverTextColor
        })
      },
      ...(!current && {
        '&:active': {
          backgroundColor: componentTheme.activeBackgroundColor,
          color: componentTheme.activeTextColor
        }
      })
    }
  }
}

export default generateStyle

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
import type { AccountItemStyle } from './props.js'

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
  componentTheme: ReturnType<NewComponentTypes['MainNavAccountItem']>,
  params: StyleParams
): AccountItemStyle => {
  const { collapsed, current, open } = params

  return {
    item: {
      label: 'accountItem',
      boxSizing: 'border-box',
      margin: 0,
      ...(collapsed
        ? {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: componentTheme.minimizedItemSize,
            height: componentTheme.minimizedItemSize,
            padding: 0,
            border: 'none'
          }
        : {
            display: 'grid',
            // the DOM order puts the name before the role, for screen readers
            gridTemplateColumns: '1fr auto',
            gridTemplateAreas: '"avatar pill" "name end"',
            alignItems: 'center',
            gap: componentTheme.padding,
            width: '100%',
            padding: componentTheme.padding,
            // MainNavAccountItem has no border width token
            border: `0.0625rem solid ${componentTheme.borderColor}`
          }),
      borderRadius: componentTheme.borderRadius,
      backgroundColor: current
        ? componentTheme.currentBackgroundColor
        : open
        ? componentTheme.selectedBackgroundColor
        : componentTheme.backgroundColor,
      color: current
        ? componentTheme.currentTextColor
        : componentTheme.titleFontColor,
      fontFamily: componentTheme.titleFontFamily,
      fontSize: componentTheme.titleFontSize,
      fontWeight: componentTheme.fontWeight,
      lineHeight: componentTheme.lineHeight,
      textAlign: 'start',
      cursor: 'pointer',
      ...(!current &&
        !open && {
          '&:hover': { backgroundColor: componentTheme.hoverBackgroundColor }
        }),
      // same focus ring as MainNavItem, which has the same focus tokens
      '&:focus': {
        outline: 'none',
        boxShadow: current
          ? `inset 0 0 0 0.125rem ${componentTheme.selectedOuterFocusOutlineColor}, inset 0 0 0 0.25rem ${componentTheme.selectedInnerFocusOutlineColor}`
          : `inset 0 0 0 0.125rem ${componentTheme.outerFocusOutlineColor}, inset 0 0 0 0.25rem ${componentTheme.innerFocusOutlineColor}`
      }
    },
    avatar: {
      label: 'accountItem__avatar',
      gridArea: 'avatar',
      display: 'flex'
    },
    pill: {
      label: 'accountItem__pill',
      gridArea: 'pill',
      alignSelf: 'start',
      display: 'flex'
    },
    name: {
      label: 'accountItem__name',
      gridArea: 'name',
      minWidth: 0,
      overflowWrap: 'anywhere'
    },
    end: {
      label: 'accountItem__end',
      gridArea: 'end',
      justifySelf: 'end',
      display: 'flex',
      alignItems: 'center',
      gap: componentTheme.padding
    },
    tooltipTrigger: {
      label: 'accountItem__tooltipTrigger',
      display: 'block'
    }
  }
}

export default generateStyle

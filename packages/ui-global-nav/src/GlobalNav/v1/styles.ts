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

import { boxShadowObjectsToCSSString } from '@instructure/ui-themes'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { GlobalNavStyle, MainNavStyle } from './props.js'

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
  componentTheme: ReturnType<NewComponentTypes['GlobalNav']>,
  params: StyleParams
): GlobalNavStyle => {
  const { collapsed } = params

  return {
    globalNav: {
      label: 'globalNav',
      display: 'flex',
      width: 'fit-content',
      height: '100%',
      boxSizing: 'border-box',
      // the width tokens include the outer gap, which is this padding
      minWidth: collapsed
        ? componentTheme.minimizedminWidth
        : componentTheme.minWidth,
      padding: collapsed
        ? componentTheme.minimizedMargin
        : componentTheme.margin
    },
    rail: {
      label: 'globalNav__rail',
      display: 'flex',
      flex: 1,
      boxSizing: 'border-box',
      backgroundColor: componentTheme.backgroundColor,
      border: `${componentTheme.borderWidth} solid ${componentTheme.borderColor}`,
      borderRadius: collapsed
        ? componentTheme.minimizedBorderRadius
        : componentTheme.borderRadius,
      boxShadow: boxShadowObjectsToCSSString(componentTheme.boxShadow)
    }
  }
}

/**
 * Generates the style object of the main column from the `MainNav` tokens
 */
const generateMainNavStyle = (
  componentTheme: ReturnType<NewComponentTypes['MainNav']>,
  params: StyleParams
): MainNavStyle => {
  const { collapsed } = params

  return {
    mainNav: {
      label: 'mainNav',
      flex: 1,
      padding: collapsed
        ? `${componentTheme.minimizedGap} ${componentTheme.minimizedMargin}`
        : componentTheme.margin
    },
    header: {
      label: 'mainNav__header',
      display: 'flex',
      justifyContent: collapsed ? 'center' : 'flex-end'
    }
  }
}

export default generateStyle
export { generateMainNavStyle }

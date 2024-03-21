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

import type { TopNavBarBrandTheme } from '@instructure/shared-types'
import type {
  TopNavBarBrandProps,
  TopNavBarBrandStyle,
  TopNavBarBrandStyleProps
} from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: TopNavBarBrandTheme,
  props: TopNavBarBrandProps,
  state: TopNavBarBrandStyleProps
): TopNavBarBrandStyle => {
  const { iconBackground } = props
  const isDesktop = state.layout === 'desktop'

  return {
    topNavBarBrand: {
      label: 'topNavBarBrand',
      display: 'flex',
      alignItems: 'stretch'
    },
    container: {
      label: 'topNavBarBrand__container',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      border: 0,
      outline: 0,
      padding: 0,
      margin: 0,
      appearance: 'none',
      textDecoration: 'none'
    },
    name: {
      label: 'topNavBarBrand__name',
      display: 'flex',
      alignItems: 'center',
      height: componentTheme.logoHeight
    },
    iconContainer: {
      label: 'topNavBarBrand__iconContainer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
      padding: componentTheme.iconPadding,
      background: isDesktop ? iconBackground : undefined
    },
    icon: {
      label: 'topNavBarBrand__icon',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    focusOutlineInset: componentTheme.focusOutlineInset
  }
}

export default generateStyle

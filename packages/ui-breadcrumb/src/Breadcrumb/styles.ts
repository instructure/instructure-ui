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
import type { BreadcrumbProps, BreadcrumbStyle } from './props'

type StyleParams = {
  size: BreadcrumbProps['size']
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} params the props of the component, the style is applied to
 * @param  {Object} _sharedTokens Shared token object that stores common values for the theme.
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['Breadcrumb'],
  params: StyleParams
): BreadcrumbStyle => {
  const { size } = params

  const crumbSizeVariants = {
    // TODO fix padding calculations or gap tokens after View rework
    small: {
      fontSize: '0.875rem', // oldComponentTheme.smallFontSize,
      paddingInlineEnd: componentTheme.gapSm, // `calc(${oldComponentTheme.smallSeparatorFontSize} * 2)`,
      paddingInlineStart: 0
    },
    medium: {
      fontSize: '1rem', // oldComponentTheme.mediumFontSize,
      paddingInlineEnd: componentTheme.gapMd, // `calc(${oldComponentTheme.mediumSeparatorFontSize} * 2)`,
      paddingInlineStart: 0
    },
    large: {
      fontSize: '1.375rem', // oldComponentTheme.largeFontSize,
      paddingInlineEnd: componentTheme.gapLg, // `calc(${oldComponentTheme.largeSeparatorFontSize} * 2)`,
      paddingInlineStart: 0
    }
  }

  const separatorSizeVariants = {
    small: {
      fontSize: '0.5rem', // oldComponentTheme.smallSeparatorFontSize,
      insetInlineEnd: `calc(0.5rem + ${componentTheme.gapSm})`, // `calc(${oldComponentTheme.smallSeparatorFontSize} / 2)`
      insetInlineStart: 'auto',
      marginTop: `calc(-1 * (0.5rem / 2))` // `calc(-1 * (${oldComponentTheme.smallSeparatorFontSize} / 2))`
    },
    medium: {
      fontSize: '0.75rem', // oldComponentTheme.mediumSeparatorFontSize,
      insetInlineEnd: `calc(0.75rem + ${componentTheme.gapMd})`, // `calc(${oldComponentTheme.mediumSeparatorFontSize} / 2)`
      insetInlineStart: 'auto',
      marginTop: `calc(-1 * (0.75rem / 2))` // `calc(-1 * (${oldComponentTheme.mediumSeparatorFontSize} / 2))`
    },
    large: {
      fontSize: '1rem', // oldComponentTheme.largeSeparatorFontSize,
      insetInlineEnd: `calc(1rem + ${componentTheme.gapLg})`, // `calc(${oldComponentTheme.largeSeparatorFontSize} / 2)`
      insetInlineStart: 'auto',
      marginTop: `calc(-1 * (1rem / 2))` // `calc(-1 * (${oldComponentTheme.largeSeparatorFontSize} / 2))`
    }
  }

  return {
    breadcrumb: {
      label: 'breadcrumb',
      fontFamily: 'LatoWeb, Lato, Helvetica Neue, Helvetica, Arial, sans-serif', // oldComponentTheme.fontFamily,
      margin: 0,
      padding: 0,
      listStyleType: 'none',
      overflow: 'visible',
      display: 'flex',
      alignItems: 'center'
    },
    crumb: {
      label: 'breadcrumb__crumb',
      boxSizing: 'border-box',
      position: 'relative',
      ...crumbSizeVariants[size!],

      '&:last-child': {
        paddingInlineEnd: 0
      }
    },
    separator: {
      label: 'breadcrumb__separator',

      boxSizing: 'border-box',
      position: 'absolute',
      top: '50%',
      color: '#6A7883', // oldComponentTheme.separatorColor,
      ...separatorSizeVariants[size!]
    }
  }
}

export default generateStyle

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
import type { InstitutionLogoStyle } from './props.js'

type StyleParams = {
  collapsed: boolean
  isLink: boolean
  wordmark: boolean
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
  componentTheme: ReturnType<NewComponentTypes['MainNavInstitutionLogo']>,
  params: StyleParams,
  sharedTokens: SharedTokens
): InstitutionLogoStyle => {
  const { collapsed, isLink, wordmark } = params

  return {
    logo: {
      label: 'institutionLogo',
      display: 'flex',
      alignItems: 'center',
      gap: componentTheme.gap,
      padding: collapsed ? 0 : componentTheme.padding,
      flex: collapsed ? undefined : 1,
      ...(collapsed && {
        width: '2.5rem',
        height: '2.5rem',
        justifyContent: 'center'
      }),
      color: componentTheme.textColor,
      textDecoration: 'none',
      ...(isLink && calcFocusOutlineStyles(sharedTokens.focusOutline))
    },
    mark: {
      label: 'institutionLogo__mark',
      // MainNavInstitutionLogo has no size tokens
      width: wordmark ? 'auto' : '2.5rem',
      height: wordmark ? '2rem' : '2.5rem',
      objectFit: 'contain',
      flexShrink: 0
    }
  }
}

export default generateStyle

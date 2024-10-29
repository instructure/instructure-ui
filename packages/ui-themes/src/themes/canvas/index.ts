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

import sharedThemeTokens from '../../sharedThemeTokens'
import { ThemeRegistry } from '@instructure/theme-registry'
import { BaseTheme, Colors } from '@instructure/shared-types'
import { colors } from './colors'

const key = 'canvas'

const brandVariables = {
  /* Defaults for Canvas account branding variables: */
  'ic-brand-primary': colors?.contrasts?.blue4570,
  'ic-brand-font-color-dark': colors?.contrasts?.grey125125,

  'ic-link-color': colors?.contrasts?.blue4570,
  'ic-link-decoration': 'none',

  'ic-brand-button--primary-bgd': colors?.contrasts?.blue4570,
  'ic-brand-button--primary-text': colors?.contrasts?.white1010,
  'ic-brand-button--secondary-bgd': colors?.contrasts?.grey125125,
  'ic-brand-button--secondary-text': colors?.contrasts?.white1010,

  'ic-brand-global-nav-bgd': colors?.contrasts?.grey100100,
  'ic-global-nav-link-hover': colors?.contrasts?.grey125125,
  'ic-brand-global-nav-ic-icon-svg-fill': colors?.contrasts?.white1010,
  'ic-brand-global-nav-ic-icon-svg-fill--active': colors?.contrasts?.blue4570,
  'ic-brand-global-nav-menu-item__text-color': colors?.contrasts?.white1010,
  'ic-brand-global-nav-menu-item__text-color--active':
    colors?.contrasts?.blue4570
}

export type CanvasBrandVariables = typeof brandVariables

export type CanvasTheme = BaseTheme & {
  key: 'canvas'
} & typeof sharedThemeTokens & { colors: Colors } & CanvasBrandVariables

const __theme: CanvasTheme = {
  key,
  ...sharedThemeTokens,
  colors,
  ...brandVariables
}

const theme = ThemeRegistry.registerTheme(__theme)

export default theme

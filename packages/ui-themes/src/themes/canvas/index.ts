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
import canvas, { ThemeType } from '../newThemes/canvas'

const key = 'canvas'

const brandVariables = {
  /* Defaults for Canvas account branding variables: */
  // used for border/background/shadow colors in many places
  'ic-brand-primary': colors?.contrasts?.blue4570,
  // used in lots of places for text color
  'ic-brand-font-color-dark': colors?.contrasts?.grey125125,
  // used by Link and links in Billboard
  'ic-link-color': colors?.contrasts?.blue5782,
  'ic-link-decoration': 'none',
  // Used by BaseButton and its subcomponents
  'ic-brand-button--primary-bgd': colors?.contrasts?.blue4570,
  'ic-brand-button--primary-text': colors?.contrasts?.white1010,
  'ic-brand-button--secondary-bgd': colors?.contrasts?.grey125125, // unused!
  'ic-brand-button--secondary-text': colors?.contrasts?.white1010, // unused!
  // these are used only by SideNavBar
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
  newTheme?: ThemeType
  key: 'canvas'
} & typeof sharedThemeTokens & { colors: Colors } & CanvasBrandVariables

/**
 * Canvas theme without the `use` function and `variables` prop.
 * Not affected by global theme overrides (`.use()` function).
 * Will be default in the next major version of InstUI
 */
const __theme: CanvasTheme = {
  newTheme: canvas,
  key,
  description: 'This theme meets WCAG 2.1 AA rules for color contrast.',
  ...sharedThemeTokens,
  colors,
  ...brandVariables
}

const theme = ThemeRegistry.registerTheme(__theme)

export default theme
export { __theme as canvasThemeLocal }

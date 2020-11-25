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

import { canvas, functionalColors } from '@instructure/ui-theme-tokens'

const {
  borders,
  breakpoints,
  colors,
  forms,
  media,
  shadows,
  spacing,
  stacking,
  transitions,
  typography
} = canvas

const key = 'canvas'

const brandVariables = {
  /* Defaults for Canvas account branding variables: */
  'ic-brand-primary': colors.textBrand,
  'ic-brand-font-color-dark': colors.textDarkest,

  'ic-link-color': colors.textLink,
  'ic-link-decoration': 'none',

  'ic-brand-button--primary-bgd': colors.backgroundBrand,
  'ic-brand-button--primary-text': colors.textLightest,
  'ic-brand-button--secondary-bgd': colors.backgroundDarkest,
  'ic-brand-button--secondary-text': colors.textLightest,

  'ic-brand-global-nav-bgd': colors.backgroundBrandSecondary,
  'ic-global-nav-link-hover': colors.backgroundDarkest,
  'ic-brand-global-nav-ic-icon-svg-fill': colors.textLightest,
  'ic-brand-global-nav-ic-icon-svg-fill--active': colors.textBrand,
  'ic-brand-global-nav-menu-item__text-color': colors.textLightest,
  'ic-brand-global-nav-menu-item__text-color--active': colors.textBrand
}

const theme = {
  key,
  ...canvas,
  brandVariables
}

export default theme
export {
  theme,
  key,
  functionalColors,
  borders,
  breakpoints,
  colors,
  forms,
  media,
  shadows,
  spacing,
  stacking,
  transitions,
  typography
}

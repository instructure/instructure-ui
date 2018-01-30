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

export default function generator ({ colors, typography, spacing, borders }) {
  return {
    fontSize: typography.fontSizeSmall,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightLight,

    fontColor: colors.textLightest,
    iconSize: '1.625rem',
    iconColor: colors.textLightest,
    lineHeight: typography.lineHeight,
    backgroundColor: 'transparent',
    linkTextDecoration: 'none',

    hoverBackgroundColor: colors.backgroundDarkest,
    outerFocusOutline: `inset 0 0 0 0.125rem ${colors.borderDarkest}`,
    innerFocusOutline: `inset 0 0 0 0.1875rem ${colors.borderLightest}`,

    selectedFontColor: colors.textBrand,
    selectedIconColor: colors.textBrand,
    selectedBackgroundColor: colors.backgroundLightest,
    selectedOuterFocusOutline: `inset 0 0 0 0.125rem ${colors.borderLightest}`,
    selectedInnerFocusOutline: `inset 0 0 0 0.1875rem ${colors.borderBrand}`,

    contentPadding: spacing.xxSmall
  }
}

generator['canvas'] = function (variables) {
  return {
    fontColor: variables['ic-brand-global-nav-menu-item__text-color'],
    iconColor: variables['ic-brand-global-nav-ic-icon-svg-fill'],
    backgroundColor: variables['ic-brand-global-nav-bgd'],
    hoverBackgroundColor: variables['ic-global-nav-link-hover'],
    selectedFontColor: variables['ic-brand-global-nav-menu-item__text-color--active'],
    selectedIconColor: variables['ic-brand-global-nav-ic-icon-svg-fill--active'],
  }
}

generator['canvas-a11y'] = generator['canvas-high-contrast'] = function ({ colors }) {
  return {
    linkTextDecoration: 'underline'
  }
}


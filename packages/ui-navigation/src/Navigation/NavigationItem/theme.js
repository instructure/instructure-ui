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

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = (theme) => {
  const { colors, spacing, typography, key: themeName } = theme

  const themeSpecificStyle = {
    canvas: {
      fontColor: theme['ic-brand-global-nav-menu-item__text-color'],
      iconColor: theme['ic-brand-global-nav-ic-icon-svg-fill'],
      backgroundColor: theme['ic-brand-global-nav-bgd'],
      hoverBackgroundColor: theme['ic-global-nav-link-hover'],
      selectedFontColor:
        theme['ic-brand-global-nav-menu-item__text-color--active'],
      selectedIconColor: theme['ic-brand-global-nav-ic-icon-svg-fill--active']
    },
    'canvas-high-contrast': {
      linkTextDecoration: 'underline'
    }
  }

  const componentVariables = {
    fontSize: typography?.fontSizeSmall,
    fontFamily: typography?.fontFamily,
    fontWeight: typography?.fontWeightLight,

    fontColor: colors?.textLightest,
    iconSize: '1.625rem',
    iconColor: colors?.textLightest,
    lineHeight: typography?.lineHeight,
    backgroundColor: 'transparent',
    linkTextDecoration: 'none',

    hoverBackgroundColor: colors?.backgroundDarkest,
    outerFocusOutline: `inset 0 0 0 0.125rem ${colors?.borderDarkest}`,
    innerFocusOutline: `inset 0 0 0 0.25rem ${colors?.borderLightest}`,

    selectedFontColor: colors?.textBrand,
    selectedIconColor: colors?.textBrand,
    selectedBackgroundColor: colors?.backgroundLightest,
    selectedOuterFocusOutline: `inset 0 0 0 0.125rem ${colors?.borderLightest}`,
    selectedInnerFocusOutline: `inset 0 0 0 0.25rem ${colors?.borderBrand}`,

    contentPadding: spacing?.xxSmall
  }

  return {
    ...componentVariables,
    ...themeSpecificStyle[themeName]
  }
}

export default generateComponentTheme

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
import type { BannerStyle, BannerStyleParams } from './props'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} params Additional parameters to customize the style.
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['Banner']>,
  params: BannerStyleParams
): BannerStyle => {
  const { color, variant } = params
  const isCompact = variant === 'compact'

  const colors = {
    violet: {
      background: componentTheme.violetBackground,
      iconBackground: componentTheme.violetIconBackground
    },
    sea: {
      background: componentTheme.seaBackground,
      iconBackground: componentTheme.seaIconBackground
    }
  }[color]

  const paddingVertical = isCompact
    ? componentTheme.compactPaddingVertical
    : componentTheme.relaxedPaddingVertical
  const paddingHorizontal = isCompact
    ? componentTheme.compactPaddingHorizontal
    : componentTheme.relaxedPaddingHorizontal
  const iconSize = isCompact
    ? componentTheme.compactIconHeight
    : componentTheme.relaxedIconHeight

  return {
    banner: {
      label: 'banner',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'flex-start',
      gap: isCompact
        ? componentTheme.compactContentGapHorizontal
        : componentTheme.relaxedContentGapHorizontal,
      padding: `${paddingVertical} ${paddingHorizontal}`,
      color: componentTheme.color,
      background: colors.background,
      borderWidth: componentTheme.borderWidth,
      borderStyle: componentTheme.borderStyle,
      borderColor: componentTheme.borderColor,
      borderRadius: componentTheme.borderRadius
    },
    icon: {
      label: 'banner__icon',
      boxSizing: 'border-box',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: iconSize,
      height: iconSize,
      borderRadius: isCompact
        ? componentTheme.compactIconBorderRadius
        : componentTheme.relaxedIconBorderRadius,
      background: colors.iconBackground,
      color: componentTheme.iconColor
    },
    content: {
      label: 'banner__content',
      boxSizing: 'border-box',
      flex: 1,
      minWidth: '0.0625rem',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme.contentGapVertical
    },
    title: {
      label: 'banner__title',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.headingFontWeight,
      fontSize: isCompact
        ? componentTheme.compactHeadingFontSize
        : componentTheme.relaxedHeadingFontSize,
      lineHeight: componentTheme.headingLineHeight
    },
    body: {
      label: 'banner__body',
      fontFamily: componentTheme.fontFamily,
      fontWeight: componentTheme.contentFontWeight,
      fontSize: isCompact
        ? componentTheme.compactContentFontSize
        : componentTheme.relaxedContentFontSize,
      lineHeight: componentTheme.contentLineHeight
    },
    closeButton: {
      label: 'banner__closeButton',
      flexShrink: 0,
      display: 'flex',
      marginBlockStart: `calc(${componentTheme.closeButtonMarginTop} - ${paddingVertical})`,
      marginInlineEnd: `calc(${componentTheme.closeButtonMarginRight} - ${paddingHorizontal})`
    }
  }
}

export default generateStyle

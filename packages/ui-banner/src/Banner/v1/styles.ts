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

import type { NewComponentTypes, SharedTokens } from '@instructure/ui-themes'
import type { BannerProps, BannerStyle } from './props'

type StyleParams = {
  color: BannerProps['color']
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @param _sharedTokens Shared token object that stores common values for the theme.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: ReturnType<NewComponentTypes['Banner']>,
  params: StyleParams,
  _sharedTokens: SharedTokens
): BannerStyle => {
  const { color } = params

  const backgroundByColor = {
    plum: componentTheme.plumBackground,
    sky: componentTheme.skyBackground
  }

  const iconBackgroundByColor = {
    plum: componentTheme.plumIconBackground,
    sky: componentTheme.skyIconBackground
  }

  return {
    banner: {
      label: 'banner',
      position: 'relative',
      display: 'flex',
      borderRadius: componentTheme.borderRadius,
      borderStyle: componentTheme.borderStyle,
      borderWidth: componentTheme.borderWidth,
      borderColor: componentTheme.borderColor,
      color: componentTheme.color,
      background: backgroundByColor[color!],
      padding: `${componentTheme.paddingVertical} ${componentTheme.paddingHorizontal}`,
      gap: componentTheme.iconGap
    },
    iconContainer: {
      label: 'banner__iconContainer',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // Matches an icon chip sized to comfortably frame a single glyph.
      // Not part of the Banner token set, so kept as a literal.
      width: '2rem',
      height: '2rem',
      background: iconBackgroundByColor[color!],
      color: componentTheme.iconColor,
      borderRadius: componentTheme.iconContainerBorderRadius,
      fontSize: '1rem',
      '& svg': {
        width: '1rem',
        height: '1rem'
      }
    },
    content: {
      label: 'banner__content',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      gap: componentTheme.stackGap
    },
    title: {
      label: 'banner__title',
      color: componentTheme.titleColor,
      fontFamily: componentTheme.titleFontFamily,
      fontSize: componentTheme.titleFontSize,
      fontWeight: componentTheme.titleFontWeight,
      lineHeight: componentTheme.titleLineHeight
    },
    message: {
      label: 'banner__message',
      fontFamily: componentTheme.contentFontFamily,
      fontSize: componentTheme.contentFontSize,
      fontWeight: componentTheme.contentFontWeight,
      lineHeight: componentTheme.contentLineHeight
    },
    actions: {
      label: 'banner__actions',
      display: 'flex',
      alignItems: 'center',
      gap: componentTheme.actionGap
    },
    closeButton: {
      label: 'banner__closeButton',
      position: 'absolute',
      top: componentTheme.closeButtonMarginTop,
      insetInlineEnd: componentTheme.closeButtonMarginEnd
    }
  }
}

export default generateStyle

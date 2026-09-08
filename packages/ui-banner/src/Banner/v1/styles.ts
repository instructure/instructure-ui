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
  density: BannerProps['density']
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
  componentTheme: ReturnType<NewComponentTypes['Banner']>,
  params: StyleParams,
  _sharedTokens: SharedTokens
): BannerStyle => {
  const { color, density } = params

  const backgroundByColor = {
    violet: componentTheme.violetBackground,
    sea: componentTheme.seaBackground
  }

  const iconBackgroundByColor = {
    violet: componentTheme.violetIconBackground,
    sea: componentTheme.seaIconBackground
  }

  const paddingByDensity = {
    relaxed: `${componentTheme.relaxedPaddingVertical} ${componentTheme.relaxedPaddingHorizontal}`,
    compact: `${componentTheme.compactPaddingVertical} ${componentTheme.compactPaddingHorizontal}`
  }

  const iconBorderRadiusByDensity = {
    relaxed: componentTheme.relaxedIconBorderRadius,
    compact: componentTheme.compactIconBorderRadius
  }

  // Matches the Figma spec's Illustration frame (32px, both densities).
  // Not part of the Banner token set, so kept as a literal, like closeButtonMargin*.
  const iconSize = '2rem'

  const contentGapHorizontalByDensity = {
    relaxed: componentTheme.relaxedContentGapHorizontal,
    compact: componentTheme.compactContentGapHorizontal
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
      padding: paddingByDensity[density!],
      gap: contentGapHorizontalByDensity[density!]
    },
    icon: {
      label: 'banner__icon',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: iconSize,
      height: iconSize,
      background: iconBackgroundByColor[color!],
      color: componentTheme.iconColor,
      borderRadius: iconBorderRadiusByDensity[density!],
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
      gap: componentTheme.contentGapVertical
    },
    contentInner: {
      label: 'banner__contentInner',
      display: 'flex',
      flexDirection: 'column'
    },
    actions: {
      label: 'banner__actions',
      display: 'flex',
      alignItems: 'center',
      // Matches the Figma spec's button group itemSpacing (12px). Not part
      // of the Banner token set, so kept as a literal.
      gap: '0.75rem'
    },
    closeButton: {
      label: 'banner__closeButton',
      position: 'absolute',
      top: componentTheme.closeButtonMarginTop,
      insetInlineEnd: componentTheme.closeButtonMarginRight
    }
  }
}

export default generateStyle

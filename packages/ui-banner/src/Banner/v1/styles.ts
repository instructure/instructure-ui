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
  const { color = 'violet', density = 'relaxed' } = params
  const isCompact = density === 'compact'

  const background =
    color === 'sea'
      ? componentTheme.seaBackground
      : componentTheme.violetBackground

  const iconSwatchBackground =
    color === 'sea'
      ? componentTheme.seaIconBackground
      : componentTheme.violetIconBackground

  const paddingVertical = isCompact
    ? componentTheme.compactPaddingVertical
    : componentTheme.relaxedPaddingVertical
  const paddingHorizontal = isCompact
    ? componentTheme.compactPaddingHorizontal
    : componentTheme.relaxedPaddingHorizontal
  const contentGapHorizontal = isCompact
    ? componentTheme.compactContentGapHorizontal
    : componentTheme.relaxedContentGapHorizontal
  const iconBorderRadius = isCompact
    ? componentTheme.compactIconBorderRadius
    : componentTheme.relaxedIconBorderRadius

  return {
    banner: {
      label: 'banner',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      gap: contentGapHorizontal,
      background,
      color: componentTheme.color,
      borderStyle: componentTheme.borderStyle,
      borderWidth: componentTheme.borderWidth,
      borderColor: componentTheme.borderColor,
      borderRadius: componentTheme.borderRadius,
      padding: `${paddingVertical} ${paddingHorizontal}`
    },
    closeButton: {
      label: 'banner__closeButton',
      position: 'absolute',
      top: componentTheme.closeButtonMarginTop,
      right: componentTheme.closeButtonMarginRight
    },
    iconSwatch: {
      label: 'banner__iconSwatch',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isCompact ? '2rem' : '2.5rem',
      height: isCompact ? '2rem' : '2.5rem',
      background: iconSwatchBackground,
      borderRadius: iconBorderRadius
    },
    icon: {
      label: 'banner__icon',
      color: componentTheme.iconColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 0
    },
    content: {
      label: 'banner__content',
      display: 'flex',
      flexDirection: 'column',
      gap: componentTheme.contentGapVertical,
      minWidth: 0
    },
    cta: {
      label: 'banner__cta'
    }
  }
}

export default generateStyle

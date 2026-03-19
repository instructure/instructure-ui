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
import type { BylineProps, BylineStyle } from './props'

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
  componentTheme: NewComponentTypes['Byline'],
  params: BylineProps,
  _sharedTokens: SharedTokens
): BylineStyle => {
  const { alignContent, size } = params

  const widthSizeVariants: Record<string, string> = {
    small: String(componentTheme.small),
    medium: String(componentTheme.medium),
    large: String(componentTheme.large)
  }

  const widthSizeVariant = widthSizeVariants[size!]

  const alignContentVariants = {
    top: { alignItems: 'flex-start' },
    center: { alignItems: 'center' }
  }

  const bylineStyles = {
    display: 'flex',
    background: componentTheme.background,
    margin: 0,
    padding: 0,
    fontFamily: componentTheme.fontFamily,
    ...alignContentVariants[alignContent!]
  }

  const captionStyles = {
    color: componentTheme.color,
    margin: 0,
    padding: 0
  }

  return {
    byline: {
      label: 'byline',
      ...bylineStyles,

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(figure)': bylineStyles,
      '&:-webkit-any(figure)': bylineStyles
    },
    figure: {
      label: 'byline__figure',
      marginInlineStart: 0,
      marginInlineEnd: componentTheme.figureMargin
    },
    caption: {
      label: 'byline__caption',
      ...captionStyles,

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(figcaption)': captionStyles,
      '&:-webkit-any(figcaption)': captionStyles
    },
    title: {
      label: 'byline__title',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      display: 'block',
      margin: componentTheme.titleMargin,
      fontSize: componentTheme.titleFontSize,
      fontWeight: componentTheme.titleFontWeight,
      lineHeight: componentTheme.titleLineHeight
    },
    description: {
      label: 'byline__description',
      fontSize: componentTheme.descriptionFontSize,
      lineHeight: componentTheme.descriptionLineHeight,
      fontWeight: componentTheme.descriptionFontWeight
    },
    maxWidth: widthSizeVariant
  }
}

export default generateStyle

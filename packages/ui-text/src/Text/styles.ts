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

import type { TextTheme } from '@instructure/shared-types'
import type { TextProps, TextStyle } from './props'
import { mapSpacingToShorthand } from '@instructure/emotion'

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param  {Object} componentTheme The theme variable object.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: TextTheme,
  props: TextProps
): TextStyle => {
  const {
    size,
    wrap,
    weight,
    fontStyle,
    transform,
    lineHeight,
    letterSpacing,
    color,
    variant,
    margin
  } = props

  // Calculate margin and support both theme token values like "space4" and custom values like "10px"
  const cssMargin = margin
    ? mapSpacingToShorthand(
        margin,
        (componentTheme as TextTheme & { spacing: Record<string, string> })
          .spacing
      )
    : undefined

  const variants: Record<NonNullable<TextProps['variant']>, object> = {
    descriptionPage: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightRegular,
      fontSize: componentTheme.descriptionPage,
      lineHeight: componentTheme.lineHeight150
    },
    descriptionSection: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightRegular,
      fontSize: componentTheme.descriptionSection,
      lineHeight: componentTheme.lineHeight150
    },
    content: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightRegular,
      fontSize: componentTheme.content,
      lineHeight: componentTheme.lineHeight150
    },
    contentImportant: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.content,
      lineHeight: componentTheme.lineHeight150
    },
    contentQuote: {
      fontStyle: 'italic',
      fontWeight: componentTheme.weightRegular,
      fontSize: componentTheme.content,
      lineHeight: componentTheme.lineHeight150
    },
    contentSmall: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightRegular,
      fontSize: componentTheme.contentSmall,
      lineHeight: componentTheme.lineHeight150
    },
    legend: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightRegular,
      fontSize: componentTheme.legend,
      lineHeight: componentTheme.lineHeight150
    }
  }

  const colorVariants = {
    primary: { color: componentTheme.primaryColor },
    secondary: { color: componentTheme.secondaryColor },
    'primary-inverse': { color: componentTheme.primaryInverseColor },
    'secondary-inverse': { color: componentTheme.secondaryInverseColor },
    success: { color: componentTheme.successColor },
    brand: { color: componentTheme.brandColor },
    danger: { color: componentTheme.dangerColor },
    alert: { color: componentTheme.alertColor },
    warning: { color: componentTheme.warningColor },
    'ai-highlight': {
      color: componentTheme.aiColor,
      background: componentTheme.aiBackgroundColor
    }
  }

  const wrapStyle = {
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto'
  }

  const weightStyle = {
    normal: { fontWeight: componentTheme.fontWeightNormal },
    light: { fontWeight: componentTheme.fontWeightLight },
    bold: { fontWeight: componentTheme.fontWeightBold },
    weightRegular: { fontWeight: componentTheme.weightRegular },
    weightImportant: { fontWeight: componentTheme.weightImportant }
  }

  const fontSizeVariants = {
    'x-small': componentTheme.fontSizeXSmall,
    small: componentTheme.fontSizeSmall,
    medium: componentTheme.fontSizeMedium,
    large: componentTheme.fontSizeLarge,
    'x-large': componentTheme.fontSizeXLarge,
    'xx-large': componentTheme.fontSizeXXLarge,
    descriptionPage: componentTheme.descriptionPage,
    descriptionSection: componentTheme.descriptionSection,
    content: componentTheme.content,
    contentSmall: componentTheme.contentSmall,
    legend: componentTheme.legend
  }

  const lineHeightVariants = {
    default: { lineHeight: componentTheme.lineHeight },
    fit: { lineHeight: componentTheme.lineHeightFit },
    condensed: { lineHeight: componentTheme.lineHeightCondensed },
    double: { lineHeight: componentTheme.lineHeightDouble },
    lineHeight100: { lineHeight: componentTheme.lineHeight100 },
    lineHeight125: { lineHeight: componentTheme.lineHeight125 },
    lineHeight150: { lineHeight: componentTheme.lineHeight150 }
  }

  const letterSpacingVariants = {
    normal: componentTheme.letterSpacingNormal,
    condensed: componentTheme.letterSpacingCondensed,
    expanded: componentTheme.letterSpacingExpanded
  }

  const calcTextStyles = () => {
    if (variant) {
      return variants[variant]
    }
    return {
      ...(weight ? weightStyle[weight] : {}),
      ...(fontStyle ? { fontStyle: fontStyle } : {}),
      fontSize: fontSizeVariants[size!],
      ...(lineHeight ? lineHeightVariants[lineHeight] : {})
    }
  }

  const baseStyles = {
    '&:focus': {
      outline: 'none'
    },
    ...(color ? colorVariants[color] : {}),
    ...(wrap === 'break-word' ? wrapStyle : {}),
    letterSpacing: letterSpacingVariants[letterSpacing!],
    ...(transform ? { textTransform: transform } : {}),
    ...calcTextStyles()
  }

  const inputStyles = {
    ...baseStyles,
    outline: 0,
    appearance: 'none',
    boxSizing: 'border-box',
    background: 'none',
    border: 'none',
    borderRadius: 0,
    padding: 0,
    margin: 0,
    color: 'inherit',
    height: 'auto',
    width: '100%',
    lineHeight: 'inherit',
    textAlign: 'start',
    boxShadow: 'none',
    display: 'block'
  }

  return {
    text: {
      label: 'text',
      fontFamily: componentTheme.fontFamily,
      ...baseStyles,
      ...(margin && { margin: cssMargin }), // Apply margin if provided

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(input)[type]': inputStyles,
      '&:-webkit-any(input)[type]': inputStyles,

      'sub, sup': {
        fontSize: '75%',
        lineHeight: 0,
        position: 'relative',
        verticalAlign: 'baseline'
      },
      sup: {
        top: '-0.4em'
      },
      sub: {
        bottom: '-0.4em'
      },
      'pre, code': {
        all: 'initial',
        fontFamily: componentTheme.fontFamilyMonospace
      },
      'i, em': {
        fontStyle: 'italic'
      },
      'b, strong': {
        fontWeight: componentTheme.fontWeightBold
      },
      p: {
        display: 'block',
        padding: 0,
        margin: componentTheme.paragraphMargin
      }
    }
  }
}

export default generateStyle

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

import type { TextProps, TextStyle } from './props'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { TokenTypographyValueInst } from '@instructure/ui-themes'

type StyleParams = {
  color: TextProps['color']
  fontStyle: TextProps['fontStyle']
  lineHeight: TextProps['lineHeight']
  letterSpacing: TextProps['letterSpacing']
  transform: TextProps['transform']
  size: TextProps['size']
  variant: TextProps['variant']
  weight: TextProps['weight']
  wrap: TextProps['wrap']
}

/**
 * ---
 * private: true
 * ---
 * Generates the style object from the theme and provided additional information
 * @param componentTheme The theme variable object.
 * @param params Additional parameters to customize the style.
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: NewComponentTypes['Text'],
  params: StyleParams
): TextStyle => {
  const {
    color,
    fontStyle,
    lineHeight,
    letterSpacing,
    transform,
    size,
    variant,
    weight,
    wrap
  } = params

  const variants: Record<
    NonNullable<TextProps['variant']>,
    TokenTypographyValueInst
  > = {
    descriptionPage: {
      fontFamily: componentTheme.descriptionPage.fontFamily,
      fontWeight: componentTheme.descriptionPage.fontWeight,
      fontSize: componentTheme.descriptionPage.fontSize,
      lineHeight: componentTheme.descriptionPage.lineHeight
    },
    descriptionSection: {
      fontFamily: componentTheme.descriptionSection.fontFamily,
      fontWeight: componentTheme.descriptionSection.fontWeight,
      fontSize: componentTheme.descriptionSection.fontSize,
      lineHeight: componentTheme.descriptionSection.lineHeight
    },
    content: {
      fontFamily: componentTheme.content.fontFamily,
      fontWeight: componentTheme.content.fontWeight,
      fontSize: componentTheme.content.fontSize,
      lineHeight: componentTheme.content.lineHeight
    },
    contentImportant: {
      fontFamily: componentTheme.contentImportant.fontFamily,
      fontWeight: componentTheme.contentImportant.fontWeight,
      fontSize: componentTheme.contentImportant.fontSize,
      lineHeight: componentTheme.contentImportant.lineHeight
    },
    contentQuote: {
      fontFamily: componentTheme.contentQuote.fontFamily,
      fontWeight: componentTheme.contentQuote.fontWeight,
      fontSize: componentTheme.contentQuote.fontSize,
      lineHeight: componentTheme.contentQuote.lineHeight
    },
    contentSmall: {
      fontFamily: componentTheme.contentSmall.fontFamily,
      fontWeight: componentTheme.contentSmall.fontWeight,
      fontSize: componentTheme.contentSmall.fontSize,
      lineHeight: componentTheme.contentSmall.lineHeight
    },
    legend: {
      fontFamily: componentTheme.legend.fontFamily,
      fontWeight: componentTheme.legend.fontWeight,
      fontSize: componentTheme.legend.fontSize,
      lineHeight: componentTheme.legend.lineHeight
    }
  }

  const colorVariants = {
    primary: { color: componentTheme.baseColor },
    secondary: { color: componentTheme.mutedColor },
    'primary-inverse': { color: componentTheme.inverseColor },
    'secondary-inverse': { color: componentTheme.inverseColor },
    success: { color: componentTheme.successColor },
    brand: { color: componentTheme.primaryColor },
    danger: { color: componentTheme.errorColor },
    warning: { color: componentTheme.warningColor },
    'primary-on': { color: componentTheme.baseOnColor },
    'secondary-on': { color: componentTheme.mutedOnColor },
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
    weightRegular: { fontWeight: componentTheme.fontWeightRegular },
    weightImportant: { fontWeight: componentTheme.fontWeightImportant }
  }

  const fontSizeVariants = {
    'x-small': componentTheme.fontSizeXSmall,
    small: componentTheme.fontSizeSmall,
    medium: componentTheme.fontSizeMedium,
    large: componentTheme.fontSizeLarge,
    'x-large': componentTheme.fontSizeXLarge,
    'xx-large': componentTheme.fontSizeXXLarge,
    // these are deprecated
    descriptionPage: componentTheme.descriptionPage.fontSize,
    descriptionSection: componentTheme.descriptionSection.fontSize,
    content: componentTheme.content.fontSize,
    contentSmall: componentTheme.contentSmall.fontSize,
    legend: componentTheme.legend.fontSize
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
    ...(color ? colorVariants[color] : { color: componentTheme.baseColor }),
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

      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because
      // of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
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

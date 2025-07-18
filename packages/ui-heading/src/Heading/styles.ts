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

import type { HeadingTheme } from '@instructure/shared-types'
import type { HeadingProps, HeadingStyle } from './props'

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
  componentTheme: HeadingTheme,
  props: HeadingProps
): HeadingStyle => {
  const { level, color, border, variant, aiVariant } = props

  const variants: Record<NonNullable<HeadingProps['variant']>, object> = {
    titlePageDesktop: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.titlePageDesktop,
      lineHeight: componentTheme.lineHeight125
    },
    titlePageMobile: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.titlePageMobile,
      lineHeight: componentTheme.lineHeight125
    },
    titleSection: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.titleSection,
      lineHeight: componentTheme.lineHeight125
    },
    titleCardSection: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.titleSection,
      lineHeight: componentTheme.lineHeight125
    },
    titleModule: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.titleModule,
      lineHeight: componentTheme.lineHeight125
    },
    titleCardLarge: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.titleCardLarge,
      lineHeight: componentTheme.lineHeight125
    },
    titleCardRegular: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.titleCardRegular,
      lineHeight: componentTheme.lineHeight125
    },
    titleCardMini: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.titleCardMini,
      lineHeight: componentTheme.lineHeight125
    },
    label: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.label,
      lineHeight: componentTheme.lineHeight125
    },
    labelInline: {
      fontStyle: 'normal',
      fontWeight: componentTheme.weightImportant,
      fontSize: componentTheme.label,
      lineHeight: componentTheme.lineHeight150
    }
  }

  const levelStyles = {
    h1: {
      fontFamily: componentTheme.h1FontFamily,
      fontSize: componentTheme.h1FontSize,
      fontWeight: componentTheme.h1FontWeight
    },
    h2: {
      fontFamily: componentTheme.h2FontFamily,
      fontSize: componentTheme.h2FontSize,
      fontWeight: componentTheme.h2FontWeight
    },
    h3: {
      fontFamily: componentTheme.h3FontFamily,
      fontSize: componentTheme.h3FontSize,
      fontWeight: componentTheme.h3FontWeight
    },
    h4: {
      fontFamily: componentTheme.h4FontFamily,
      fontSize: componentTheme.h4FontSize,
      fontWeight: componentTheme.h4FontWeight
    },
    h5: {
      fontFamily: componentTheme.h5FontFamily,
      fontSize: componentTheme.h5FontSize,
      fontWeight: componentTheme.h5FontWeight
    },
    h6: {
      fontFamily: componentTheme.h6FontFamily,
      fontSize: componentTheme.h6FontSize,
      fontWeight: componentTheme.h6FontWeight
    },
    reset: {
      margin: 0,
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit'
    }
  }

  const colorStyles = {
    inherit: { color: 'inherit' },
    primary: { color: componentTheme.primaryColor },
    secondary: { color: componentTheme.secondaryColor },
    'primary-inverse': { color: componentTheme.primaryInverseColor },
    'secondary-inverse': { color: componentTheme.secondaryInverseColor },
    ai: {
      background: `
        linear-gradient(to bottom, ${componentTheme.aiTextTopGradientColor} 0%, ${componentTheme.aiTextBottomGradientColor} 100%) text`,
      border: 'solid transparent',
      WebkitTextFillColor: 'transparent'
    }
  }

  const borderStyles = {
    top: {
      paddingTop: componentTheme.borderPadding,
      borderTop: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`
    },
    bottom: {
      paddingBottom: componentTheme.borderPadding,
      borderBottom: `${componentTheme.borderWidth} ${componentTheme.borderStyle} ${componentTheme.borderColor}`
    },
    none: {}
  }

  const inputStyles = {
    outline: 0,
    appearance: 'none',
    boxSizing: 'border-box',
    background: 'none',
    border: 'none',
    borderRadius: 0,
    padding: 0,
    margin: '-0.375rem 0 0 0',
    color: 'inherit',
    height: 'auto',
    width: '100%',
    lineHeight: 'inherit',
    textAlign: 'start',
    boxShadow: 'none',
    display: 'block',
    '&:focus': { outline: 'none' }
  }

  return {
    heading: {
      label: 'heading',
      lineHeight: componentTheme.lineHeight,
      margin: 0,
      // NOTE: the input styles exist to accommodate the InPlaceEdit component
      // NOTE: needs separate groups for `:is()` and `:-webkit-any()` because of css selector group validation (see https://www.w3.org/TR/selectors-3/#grouping)
      '&:is(input)[type]': inputStyles,
      '&:-webkit-any(input)[type]': inputStyles,

      ...(variant ? variants[variant] : levelStyles[level!]),
      ...colorStyles[color!],
      ...borderStyles[border!]
    },
    igniteAI: {
      label: 'heading__ignite-ai',
      background: `
        linear-gradient(to bottom, ${componentTheme.aiTextTopGradientColor} 0%, ${componentTheme.aiTextBottomGradientColor} 100%) text`,
      border: 'solid transparent',
      WebkitTextFillColor: 'transparent',
      paddingRight: '.25rem'
    },
    igniteAIStacked: {
      label: 'heading__ignite-ai-stacked',
      fontSize: '1rem',
      lineHeight: '1.25rem',
      display: 'flex',
      alignItems: 'center'
    },
    withIcon: {
      label: 'heading__with-icon',
      display: 'flex',
      alignItems: 'center',
      ...(aiVariant === 'stacked'
        ? {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }
        : {})
    }
  }
}
export default generateStyle

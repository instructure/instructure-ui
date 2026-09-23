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
import type { PillStyle, PillStyleParams } from './props'

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
  componentTheme: ReturnType<NewComponentTypes['Pill']>,
  params: PillStyleParams
): PillStyle => {
  const { color, size } = params

  const sizeVariants = {
    'x-small': {
      height: componentTheme.heightXSmall,
      paddingInline: componentTheme.paddingHorizontal,
      fontSize: componentTheme.textFontSize,
      gap: componentTheme.gapIconLabel
    },
    small: {
      height: componentTheme.height,
      paddingInline: componentTheme.paddingHorizontal,
      fontSize: componentTheme.textFontSize,
      gap: componentTheme.gapIconLabel
    },
    medium: {
      height: componentTheme.heightMedium,
      paddingInline: componentTheme.paddingHorizontalMedium,
      fontSize: componentTheme.textFontSizeMedium,
      gap: componentTheme.gapIconLabelMedium
    },
    large: {
      height: componentTheme.heightLarge,
      paddingInline: componentTheme.paddingHorizontalLarge,
      fontSize: componentTheme.textFontSizeLarge,
      gap: componentTheme.gapIconLabelLarge
    }
  }

  const colorVariants = {
    primary: {
      color: componentTheme.baseTextColor,
      borderColor: componentTheme.baseBorderColor,
      background: componentTheme.neutralBackgroundColor
    },
    info: {
      color: componentTheme.infoTextColor,
      borderColor: componentTheme.infoBorderColor,
      background: componentTheme.infoBackgroundColor
    },
    success: {
      color: componentTheme.successTextColor,
      borderColor: componentTheme.successBorderColor,
      background: componentTheme.successBackgroundColor
    },
    warning: {
      color: componentTheme.warningTextColor,
      borderColor: componentTheme.warningBorderColor,
      background: componentTheme.warningBackgroundColor
    },
    error: {
      color: componentTheme.errorTextColor,
      borderColor: componentTheme.errorBorderColor,
      background: componentTheme.errorBackgroundColor
    },
    stone: {
      color: componentTheme.stoneTextColor,
      borderColor: componentTheme.stoneBorderColor,
      background: componentTheme.stoneBackgroundColor
    },
    sky: {
      color: componentTheme.skyTextColor,
      borderColor: componentTheme.skyBorderColor,
      background: componentTheme.skyBackgroundColor
    },
    orange: {
      color: componentTheme.orangeTextColor,
      borderColor: componentTheme.orangeBorderColor,
      background: componentTheme.orangeBackgroundColor
    },
    aurora: {
      color: componentTheme.auroraTextColor,
      borderColor: componentTheme.auroraBorderColor,
      background: componentTheme.auroraBackgroundColor
    },
    plum: {
      color: componentTheme.plumTextColor,
      borderColor: componentTheme.plumBorderColor,
      background: componentTheme.plumBackgroundColor
    },
    violet: {
      color: componentTheme.violetTextColor,
      borderColor: componentTheme.violetBorderColor,
      background: componentTheme.violetBackgroundColor
    },
    sea: {
      color: componentTheme.seaTextColor,
      borderColor: componentTheme.seaBorderColor,
      background: componentTheme.seaBackgroundColor
    }
  }

  const { fontSize, ...sizeStyles } = sizeVariants[size]

  return {
    pill: {
      label: 'pill',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      borderWidth: componentTheme.borderWidth,
      borderStyle: componentTheme.borderStyle,
      borderRadius: componentTheme.borderRadius,
      fontFamily: componentTheme.fontFamily,
      ...sizeStyles,
      ...colorVariants[color]
    },
    status: {
      label: 'pill__status',
      fontWeight: componentTheme.statusLabelFontWeight,
      marginInlineEnd: componentTheme.gapContent
    },
    icon: {
      label: 'pill__icon',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      ...(color === 'error' && { color: componentTheme.errorIconColor })
    },
    text: {
      label: 'pill__text',
      boxSizing: 'border-box',
      maxWidth: componentTheme.maxWidth,
      fontSize,
      lineHeight: `calc(${sizeStyles.height} - 2 * ${componentTheme.borderWidth})`,
      fontWeight: componentTheme.textFontWeight,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    maxWidth: componentTheme.maxWidth
  }
}

export default generateStyle

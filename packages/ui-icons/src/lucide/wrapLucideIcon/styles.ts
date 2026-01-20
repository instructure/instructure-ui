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

import { px } from '@instructure/ui-utils'
import type { NewComponentTypes } from '@instructure/ui-themes'
import { LucideIconStyle, LucideIconWrapperProps } from './props'

type StyleParams = {
  size?: LucideIconWrapperProps['size']
  color?: LucideIconWrapperProps['color']
  rotate?: LucideIconWrapperProps['rotate']
  bidirectional?: LucideIconWrapperProps['bidirectional']
  inline?: LucideIconWrapperProps['inline']
  themeOverride?: LucideIconWrapperProps['themeOverride']
}

/**
 * Convert semantic size token to numeric pixels for Lucide
 */
const convertSemanticSize = (
  size: LucideIconWrapperProps['size'],
  componentTheme: NewComponentTypes['Icon']
) => {
  if (!size) return undefined

  const sizeTokenMap = {
    xs: componentTheme.sizeXs,
    sm: componentTheme.sizeSm,
    md: componentTheme.sizeMd,
    lg: componentTheme.sizeLg,
    xl: componentTheme.sizeXl,
    '2xl': componentTheme.size2xl,
    // Legacy SVGIcon size tokens (DEPRECATED)
    'x-small': '1.125rem',
    small: '2rem',
    medium: '3rem',
    large: '5rem',
    'x-large': '10rem'
  }
  return px(sizeTokenMap[size])
}

/**
 * Convert semantic size token to stroke width value for Lucide
 * Derives stroke width from size using matching token
 */
const convertSizeToStrokeWidth = (
  size: LucideIconWrapperProps['size'],
  componentTheme: NewComponentTypes['Icon']
) => {
  if (!size) return undefined

  const strokeWidthTokenMap = {
    xs: componentTheme.strokeWidthXs,
    sm: componentTheme.strokeWidthSm,
    md: componentTheme.strokeWidthMd,
    lg: componentTheme.strokeWidthLg,
    xl: componentTheme.strokeWidthXl,
    '2xl': componentTheme.strokeWidth2xl,
    // Legacy SVGIcon stroke tokens (DEPRECATED)
    'x-small': '0.0859375rem',
    small: '0.15625rem',
    medium: '0.21875rem',
    large: '0.3125rem',
    'x-large': '0.625rem'
  }

  return px(strokeWidthTokenMap[size])
}

const determineColorValue = (
  color: LucideIconWrapperProps['color'],
  componentTheme: NewComponentTypes['Icon']
) => {
  if (!color) {
    return undefined
  }

  const colorTokenMap = {
    baseColor: componentTheme.baseColor,
    mutedColor: componentTheme.mutedColor,
    successColor: componentTheme.successColor,
    errorColor: componentTheme.errorColor,
    warningColor: componentTheme.warningColor,
    infoColor: componentTheme.infoColor,
    onColor: componentTheme.onColor,
    inverseColor: componentTheme.inverseColor,
    disabledBaseColor: componentTheme.disabledBaseColor,
    disabledOnColor: componentTheme.disabledOnColor,
    dark: componentTheme.dark,
    ai: undefined, // symbolic token for AI gradient colors, will be returned as gradient values
    navigationPrimaryBaseColor: componentTheme.navigationPrimaryBaseColor,
    navigationPrimaryHoverColor: componentTheme.navigationPrimaryHoverColor,
    navigationPrimaryActiveColor: componentTheme.navigationPrimaryActiveColor,
    navigationPrimaryOnColorBaseColor:
      componentTheme.navigationPrimaryOnColorBaseColor,
    navigationPrimaryOnColorHoverColor:
      componentTheme.navigationPrimaryOnColorHoverColor,
    navigationPrimaryOnColorActiveColor:
      componentTheme.navigationPrimaryOnColorActiveColor,
    actionSecondaryBaseColor: componentTheme.actionSecondaryBaseColor,
    actionSecondaryHoverColor: componentTheme.actionSecondaryHoverColor,
    actionSecondaryActiveColor: componentTheme.actionSecondaryActiveColor,
    actionSecondaryDisabledColor: componentTheme.actionSecondaryDisabledColor,
    actionStatusBaseColor: componentTheme.actionStatusBaseColor,
    actionStatusHoverColor: componentTheme.actionStatusHoverColor,
    actionStatusActiveColor: componentTheme.actionStatusActiveColor,
    actionStatusDisabledColor: componentTheme.actionStatusDisabledColor,
    // actionAiSecondaryTopGradientBaseColor internally used for AI gradient
    // actionAiSecondaryBottomGradientBaseColor internally used for AI gradient
    actionAiBaseColor: componentTheme.actionAiBaseColor,
    actionAiHoverColor: componentTheme.actionAiHoverColor,
    actionAiActiveColor: componentTheme.actionAiActiveColor,
    actionAiDisabledColor: componentTheme.actionAiDisabledColor,
    actionPrimaryBaseColor: componentTheme.actionPrimaryBaseColor,
    actionPrimaryHoverColor: componentTheme.actionPrimaryHoverColor,
    actionPrimaryActiveColor: componentTheme.actionPrimaryActiveColor,
    actionPrimaryDisabledColor: componentTheme.actionPrimaryDisabledColor,
    actionPrimaryOnColorBaseColor: componentTheme.actionPrimaryOnColorBaseColor,
    actionPrimaryOnColorHoverColor:
      componentTheme.actionPrimaryOnColorHoverColor,
    actionPrimaryOnColorActiveColor:
      componentTheme.actionPrimaryOnColorActiveColor,
    actionPrimaryOnColorDisabledColor:
      componentTheme.actionPrimaryOnColorDisabledColor,
    accentBlueColor: componentTheme.accentBlueColor,
    accentGreenColor: componentTheme.accentGreenColor,
    accentRedColor: componentTheme.accentRedColor,
    accentOrangeColor: componentTheme.accentOrangeColor,
    accentGreyColor: componentTheme.accentGreyColor,
    accentAshColor: componentTheme.accentAshColor,
    accentPlumColor: componentTheme.accentPlumColor,
    accentVioletColor: componentTheme.accentVioletColor,
    accentStoneColor: componentTheme.accentStoneColor,
    accentSkyColor: componentTheme.accentSkyColor,
    accentHoneyColor: componentTheme.accentHoneyColor,
    accentSeaColor: componentTheme.accentSeaColor,
    accentAuroraColor: componentTheme.accentAuroraColor,
    actionTertiaryBaseColor: componentTheme.actionTertiaryBaseColor,
    actionTertiaryHoverColor: componentTheme.actionTertiaryHoverColor,
    actionTertiaryActiveColor: componentTheme.actionTertiaryActiveColor,
    actionTertiaryDisabledColor: componentTheme.actionTertiaryDisabledColor,
    actionSuccessSecondaryBaseColor:
      componentTheme.actionSuccessSecondaryBaseColor,
    actionSuccessSecondaryDisabledColor:
      componentTheme.actionSuccessSecondaryDisabledColor,
    actionDestructiveSecondaryBaseColor:
      componentTheme.actionDestructiveSecondaryBaseColor,
    actionDestructiveSecondaryDisabledColor:
      componentTheme.actionDestructiveSecondaryDisabledColor,
    actionAiSecondaryDisabledColor:
      componentTheme.actionAiSecondaryDisabledColor,
    actionSecondaryOnColorBaseColor:
      componentTheme.actionSecondaryOnColorBaseColor,
    actionSecondaryOnColorHoverColor:
      componentTheme.actionSecondaryOnColorHoverColor,
    actionSecondaryOnColorActiveColor:
      componentTheme.actionSecondaryOnColorActiveColor,
    actionSecondaryOnColorDisabledColor:
      componentTheme.actionSecondaryOnColorDisabledColor,
    actionSuccessSecondaryHoverColor:
      componentTheme.actionSuccessSecondaryHoverColor,
    actionSuccessSecondaryActiveColor:
      componentTheme.actionSuccessSecondaryActiveColor,
    actionDestructiveSecondaryHoverColor:
      componentTheme.actionDestructiveSecondaryHoverColor,
    actionDestructiveSecondaryActiveColor:
      componentTheme.actionDestructiveSecondaryActiveColor,

    // Legacy SVGIcon color tokens (DEPRECATED)
    primary: componentTheme.baseColor,
    secondary: componentTheme.mutedColor,
    'primary-inverse': componentTheme.onColor,
    'secondary-inverse': componentTheme.onColor,
    success: componentTheme.successColor,
    error: componentTheme.errorColor,
    alert: componentTheme.infoColor,
    warning: componentTheme.warningColor,
    brand: componentTheme.infoColor,

    // auto is legacy token from SVGIcon (DEPRECATED)
    auto: 'currentColor',
    inherit: 'currentColor'
  }
  return colorTokenMap[color]
}

const generateStyle = (
  componentTheme: NewComponentTypes['Icon'],
  params: StyleParams
): LucideIconStyle => {
  const {
    size,
    color,
    rotate = '0',
    bidirectional = true,
    inline = true
  } = params

  const numericSize = convertSemanticSize(size, componentTheme)
  // Derive stroke width from size
  const numericStrokeWidth = convertSizeToStrokeWidth(size, componentTheme)
  const resolvedColor = determineColorValue(color, componentTheme)

  let gradientColors: { top: string; bottom: string } | undefined

  if (color === 'ai') {
    // Special handling for AI gradient color
    gradientColors = {
      top: componentTheme.actionAiSecondaryTopGradientBaseColor,
      bottom: componentTheme.actionAiSecondaryBottomGradientBaseColor
    }
  }

  const rotateVariants = {
    '0': {},
    '90': { transform: 'rotate(90deg)' },
    '180': { transform: 'rotate(180deg)' },
    '270': { transform: 'rotate(270deg)' }
  }

  const bidirectionalRotateVariants = {
    '0': { transform: 'scaleX(-1)' },
    '90': { transform: 'scaleX(-1) rotate(90deg)' },
    '180': { transform: 'scaleX(-1) rotate(180deg)' },
    '270': { transform: 'scaleX(-1) rotate(270deg)' }
  }

  return {
    lucideIcon: {
      label: 'lucideIcon',
      display: inline ? 'inline-block' : 'block',
      verticalAlign: 'middle',
      lineHeight: 0,
      fontSize: 0,
      ...rotateVariants[rotate],
      ...(bidirectional && {
        '[dir="rtl"] &': bidirectionalRotateVariants[rotate]
      })
    },
    numericSize,
    numericStrokeWidth,
    resolvedColor,
    gradientColors
  }
}

export default generateStyle

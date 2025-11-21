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
import type { LucideIconWrapperProps, LucideIconStyle } from './props'

type StyleParams = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: string
  rotate?: '0' | '90' | '180' | '270'
  bidirectional?: boolean
  inline?: boolean
  themeOverride?: LucideIconWrapperProps['themeOverride']
}

const generateStyle = (
  componentTheme: NewComponentTypes['Icon'],
  params: StyleParams
): LucideIconStyle => {
  const { color, rotate = '0', bidirectional = true, inline = true } = params

  const colorVariants = {
    inherit: { color: 'inherit' },
    baseColor: { color: componentTheme.baseColor },
    mutedColor: { color: componentTheme.mutedColor },
    successColor: { color: componentTheme.successColor },
    errorColor: { color: componentTheme.errorColor },
    warningColor: { color: componentTheme.warningColor },
    infoColor: { color: componentTheme.infoColor },
    onColor: { color: componentTheme.onColor },
    inverseColor: { color: componentTheme.inverseColor },
    disabledBaseColor: { color: componentTheme.disabledBaseColor },
    disabledOnColor: { color: componentTheme.disabledOnColor },
    navigationPrimaryBaseColor: {
      color: componentTheme.navigationPrimaryBaseColor
    },
    navigationPrimaryHoverColor: {
      color: componentTheme.navigationPrimaryHoverColor
    },
    navigationPrimaryActiveColor: {
      color: componentTheme.navigationPrimaryActiveColor
    },
    navigationPrimaryOnColorBaseColor: {
      color: componentTheme.navigationPrimaryOnColorBaseColor
    },
    navigationPrimaryOnColorHoverColor: {
      color: componentTheme.navigationPrimaryOnColorHoverColor
    },
    navigationPrimaryOnColorActiveColor: {
      color: componentTheme.navigationPrimaryOnColorActiveColor
    },
    actionSecondaryBaseColor: {
      color: componentTheme.actionSecondaryBaseColor
    },
    actionSecondaryHoverColor: {
      color: componentTheme.actionSecondaryHoverColor
    },
    actionSecondaryActiveColor: {
      color: componentTheme.actionSecondaryActiveColor
    },
    actionSecondaryDisabledColor: {
      color: componentTheme.actionSecondaryDisabledColor
    },
    actionStatusBaseColor: { color: componentTheme.actionStatusBaseColor },
    actionStatusHoverColor: { color: componentTheme.actionStatusHoverColor },
    actionStatusActiveColor: { color: componentTheme.actionStatusActiveColor },
    actionStatusDisabledColor: {
      color: componentTheme.actionStatusDisabledColor
    },
    actionAiSecondaryTopGradientBaseColor: {
      color: componentTheme.actionAiSecondaryTopGradientBaseColor
    },
    actionAiSecondaryTopGradientDisabledColor: {
      color: componentTheme.actionAiSecondaryTopGradientDisabledColor
    },
    actionAiSecondaryBottomGradientBaseColor: {
      color: componentTheme.actionAiSecondaryBottomGradientBaseColor
    },
    actionAiSecondaryBottomGradientDisabledColor: {
      color: componentTheme.actionAiSecondaryBottomGradientDisabledColor
    },
    actionAiBaseColor: { color: componentTheme.actionAiBaseColor },
    actionAiHoverColor: { color: componentTheme.actionAiHoverColor },
    actionAiActiveColor: { color: componentTheme.actionAiActiveColor },
    actionAiDisabledColor: { color: componentTheme.actionAiDisabledColor },
    actionPrimaryBaseColor: { color: componentTheme.actionPrimaryBaseColor },
    actionPrimaryHoverColor: { color: componentTheme.actionPrimaryHoverColor },
    actionPrimaryActiveColor: {
      color: componentTheme.actionPrimaryActiveColor
    },
    actionPrimaryDisabledColor: {
      color: componentTheme.actionPrimaryDisabledColor
    },
    actionPrimaryOnColorBaseColor: {
      color: componentTheme.actionPrimaryOnColorBaseColor
    },
    actionPrimaryOnColorHoverColor: {
      color: componentTheme.actionPrimaryOnColorHoverColor
    },
    actionPrimaryOnColorActiveColor: {
      color: componentTheme.actionPrimaryOnColorActiveColor
    },
    actionPrimaryOnColorDisabledColor: {
      color: componentTheme.actionPrimaryOnColorDisabledColor
    },
    accentBlueColor: { color: componentTheme.accentBlueColor },
    accentGreenColor: { color: componentTheme.accentGreenColor },
    accentRedColor: { color: componentTheme.accentRedColor },
    accentOrangeColor: { color: componentTheme.accentOrangeColor },
    accentGreyColor: { color: componentTheme.accentGreyColor },
    accentAshColor: { color: componentTheme.accentAshColor },
    accentPlumColor: { color: componentTheme.accentPlumColor },
    accentVioletColor: { color: componentTheme.accentVioletColor },
    accentStoneColor: { color: componentTheme.accentStoneColor },
    accentSkyColor: { color: componentTheme.accentSkyColor },
    accentHoneyColor: { color: componentTheme.accentHoneyColor },
    accentSeaColor: { color: componentTheme.accentSeaColor },
    accentAutoraColor: { color: componentTheme.accentAutoraColor },
    actionTertiaryBaseColor: { color: componentTheme.actionTertiaryBaseColor },
    actionTertiaryHoverColor: {
      color: componentTheme.actionTertiaryHoverColor
    },
    actionTertiaryActiveColor: {
      color: componentTheme.actionTertiaryActiveColor
    },
    actionTertiaryDisabledColor: {
      color: componentTheme.actionTertiaryDisabledColor
    },
    actionSuccessSecondaryBaseColor: {
      color: componentTheme.actionSuccessSecondaryBaseColor
    },
    actionSuccessSecondaryDisabledColor: {
      color: componentTheme.actionSuccessSecondaryDisabledColor
    },
    actionDestructiveSecondaryBaseColor: {
      color: componentTheme.actionDestructiveSecondaryBaseColor
    },
    actionDestructiveSecondaryDisabledColor: {
      color: componentTheme.actionDestructiveSecondaryDisabledColor
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
      ...(color &&
        (colorVariants[color as keyof typeof colorVariants] || { color })),
      ...rotateVariants[rotate],
      ...(bidirectional && {
        '[dir="rtl"] &': bidirectionalRotateVariants[rotate]
      })
    }
  }
}

export default generateStyle

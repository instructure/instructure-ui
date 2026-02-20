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

import type { ComponentStyle, ThemeOverrideValue } from '@instructure/emotion'
import type { OtherHTMLAttributes } from '@instructure/shared-types'

/**
 * SVGIcon size tokens (legacy) - DEPRECATED
 */
type SVGIconSizeToken = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

/**
 * SVGIcon color tokens (legacy) - DEPRECATED
 */
type LegacyColorTokens =
  | 'primary'
  | 'secondary'
  | 'primary-inverse'
  | 'secondary-inverse'
  | 'success'
  | 'error'
  | 'alert'
  | 'warning'
  | 'brand'
  | 'auto'

/**
 * Semantic size tokens for icons - includes SVGIcon legacy tokens, they are DEPRECATED and will be deleted, DON'T USE THEM.
 */
type IconSizeToken =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'illu-sm'
  | 'illu-md'
  | 'illu-lg'
  | SVGIconSizeToken

/**
 * Semantic color tokens from Icon theme
 */
type IconColorToken =
  | 'baseColor'
  | 'mutedColor'
  | 'successColor'
  | 'errorColor'
  | 'warningColor'
  | 'infoColor'
  | 'onColor'
  | 'inverseColor'
  | 'disabledBaseColor'
  | 'disabledOnColor'
  | 'dark'
  | 'sideNavColor'
  | 'sideNavActiveColor'
  | 'ai' // symbolic token for AI gradient colors, this does not exist in the theme
  | 'navigationPrimaryBaseColor'
  | 'navigationPrimaryHoverColor'
  | 'navigationPrimaryActiveColor'
  | 'navigationPrimaryOnColorBaseColor'
  | 'navigationPrimaryOnColorHoverColor'
  | 'navigationPrimaryOnColorActiveColor'
  | 'actionSecondaryBaseColor'
  | 'actionSecondaryHoverColor'
  | 'actionSecondaryActiveColor'
  | 'actionSecondaryDisabledColor'
  | 'actionStatusBaseColor'
  | 'actionStatusHoverColor'
  | 'actionStatusActiveColor'
  | 'actionStatusDisabledColor'
  // | 'actionAiSecondaryTopGradientBaseColor' internally used for AI gradient
  // | 'actionAiSecondaryBottomGradientBaseColor' internally used for AI gradient
  | 'actionAiBaseColor'
  | 'actionAiHoverColor'
  | 'actionAiActiveColor'
  | 'actionAiDisabledColor'
  | 'actionPrimaryBaseColor'
  | 'actionPrimaryHoverColor'
  | 'actionPrimaryActiveColor'
  | 'actionPrimaryDisabledColor'
  | 'actionPrimaryOnColorBaseColor'
  | 'actionPrimaryOnColorHoverColor'
  | 'actionPrimaryOnColorActiveColor'
  | 'actionPrimaryOnColorDisabledColor'
  | 'accentBlueColor'
  | 'accentGreenColor'
  | 'accentRedColor'
  | 'accentOrangeColor'
  | 'accentGreyColor'
  | 'accentAshColor'
  | 'accentPlumColor'
  | 'accentVioletColor'
  | 'accentStoneColor'
  | 'accentSkyColor'
  | 'accentHoneyColor'
  | 'accentSeaColor'
  | 'accentAuroraColor'
  | 'actionTertiaryBaseColor'
  | 'actionTertiaryHoverColor'
  | 'actionTertiaryActiveColor'
  | 'actionTertiaryDisabledColor'
  | 'actionSuccessSecondaryBaseColor'
  | 'actionSuccessSecondaryDisabledColor'
  | 'actionDestructiveSecondaryBaseColor'
  | 'actionDestructiveSecondaryDisabledColor'
  | 'actionAiSecondaryDisabledColor'
  | 'actionSecondaryOnColorBaseColor'
  | 'actionSecondaryOnColorHoverColor'
  | 'actionSecondaryOnColorActiveColor'
  | 'actionSecondaryOnColorDisabledColor'
  | 'actionSuccessSecondaryHoverColor'
  | 'actionSuccessSecondaryActiveColor'
  | 'actionDestructiveSecondaryHoverColor'
  | 'actionDestructiveSecondaryActiveColor'

type InstUIIconOwnProps = {
  /**
   * Semantic size token (also determines stroke width automatically)
   */
  size?: IconSizeToken
  /**
   * Icon theme color token
   */
  color?: 'inherit' | IconColorToken | LegacyColorTokens
  /**
   * Rotation angle in degrees
   */
  rotate?: '0' | '90' | '180' | '270'
  /**
   * Flip horizontally in RTL contexts
   * @default true
   */
  bidirectional?: boolean
  /**
   * Display mode: inline-block (true) or block (false)
   * @default true
   */
  inline?: boolean
  /**
   * Accessible title (adds role="img" and aria-label)
   */
  title?: string
  /**
   * provides a reference to the underlying SVG element
   */
  elementRef?: (element: SVGSVGElement | null) => void
}

/**
 * Full props: InstUI semantic + theme support + SVG attributes.
 * OtherHTMLAttributes provides SVG props for backward compatibility.
 * children, style, and className are explicitly omitted.
 */
type LucideIconWrapperProps = Omit<
  InstUIIconOwnProps & {
    themeOverride?: ThemeOverrideValue
  } & OtherHTMLAttributes<InstUIIconOwnProps>,
  'children' | 'style' | 'className'
>

type LucideIconStyle = ComponentStyle<'lucideIcon'> & {
  /**
   * Computed numeric size for Lucide icon (in pixels)
   */
  numericSize?: number
  /**
   * Computed numeric stroke width for Lucide icon
   */
  numericStrokeWidth?: number | string
  /**
   * Resolved color from theme for Lucide icon
   */
  resolvedColor?: string
  /**
   * Gradient colors for AI gradient (top and bottom)
   */
  gradientColors?: { top: string; bottom: string }
}

export type { LucideIconWrapperProps, InstUIIconOwnProps, LucideIconStyle }

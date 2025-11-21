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

import type { LucideProps } from 'lucide-react'
import type { WithStyleProps, ComponentStyle } from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { OtherHTMLAttributes } from '@instructure/shared-types'

type InstUIIconOwnProps = {
  /** Semantic size ('xs', 'sm', 'md', 'lg', 'xl', '2xl') or numeric pixels */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number

  /** Semantic size ('xs', 'sm', 'md', 'lg', 'xl', '2xl') or numeric value */
  strokeWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number | string

  /** Icon theme token or CSS color */
  color?:
    | 'inherit'
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
    | 'actionAiSecondaryTopGradientBaseColor'
    | 'actionAiSecondaryTopGradientDisabledColor'
    | 'actionAiSecondaryBottomGradientBaseColor'
    | 'actionAiSecondaryBottomGradientDisabledColor'
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
    | 'accentAutoraColor'
    | 'actionTertiaryBaseColor'
    | 'actionTertiaryHoverColor'
    | 'actionTertiaryActiveColor'
    | 'actionTertiaryDisabledColor'
    | 'actionSuccessSecondaryBaseColor'
    | 'actionSuccessSecondaryDisabledColor'
    | 'actionDestructiveSecondaryBaseColor'
    | 'actionDestructiveSecondaryDisabledColor'
    | string

  /** Rotation angle in degrees */
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

  /** Accessible title (adds role="img" and aria-label) */
  title?: string

  /** Accessible description (combined with title in aria-label) */
  description?: string

  /** Ref for the underlying SVG element */
  elementRef?: React.Ref<SVGSVGElement>
}

/**
 * Full props: Lucide native + InstUI semantic + theme support.
 * InstUI props override Lucide's size, color, strokeWidth, rotate.
 */
type LucideIconWrapperProps = Omit<
  LucideProps,
  'size' | 'color' | 'strokeWidth' | 'rotate'
> &
  InstUIIconOwnProps &
  WithStyleProps<NewComponentTypes['Icon'], LucideIconStyle> &
  OtherHTMLAttributes<InstUIIconOwnProps>

type LucideIconStyle = ComponentStyle<'lucideIcon'>

export type { LucideIconWrapperProps, InstUIIconOwnProps, LucideIconStyle }

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
import type { ComponentStyle, ThemeOverrideValue } from '@instructure/emotion'
import type { NewComponentTypes } from '@instructure/ui-themes'
import type { OtherHTMLAttributes } from '@instructure/shared-types'

/**
 * Extract size tokens from Icon theme (sizeXs, sizeSm, etc.)
 * and transform to lowercase literals ('xs', 'sm', etc.)
 */
type ExtractSizeTokens<T> = {
  [K in keyof T]: K extends `size${infer Size}` ? Lowercase<Size> : never
}[keyof T]

/**
 * Extract strokeWidth tokens from Icon theme (strokeWidthXs, etc.)
 * and transform to lowercase literals ('xs', 'sm', etc.)
 */
type ExtractStrokeWidthTokens<T> = {
  [K in keyof T]: K extends `strokeWidth${infer Size}` ? Lowercase<Size> : never
}[keyof T]

/**
 * Extract color tokens from Icon theme
 * (all properties except size/strokeWidth and 'dark')
 */
type ExtractColorTokens<T> = Exclude<
  keyof T,
  `size${string}` | `strokeWidth${string}` | 'dark'
>

type IconSizeToken = ExtractSizeTokens<NewComponentTypes['Icon']>
type IconStrokeWidthToken = ExtractStrokeWidthTokens<NewComponentTypes['Icon']>
type IconColorToken = ExtractColorTokens<NewComponentTypes['Icon']>

type InstUIIconOwnProps = {
  /**
   * Semantic size token or numeric pixels
   */
  size?: IconSizeToken | number
  /**
   * Semantic stroke width token or numeric value
   */
  strokeWidth?: IconStrokeWidthToken | number | string
  /**
   * Icon theme color token or CSS color value
   */
  color?: 'inherit' | IconColorToken | string
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
 * Full props: Lucide native + InstUI semantic + theme support.
 * InstUI props override Lucide's size, color, strokeWidth, rotate.
 */
type LucideIconWrapperProps = Omit<
  LucideProps,
  'size' | 'color' | 'strokeWidth' | 'rotate'
> &
  InstUIIconOwnProps & {
    themeOverride?: ThemeOverrideValue
  } & OtherHTMLAttributes<InstUIIconOwnProps>

type LucideIconStyle = ComponentStyle<'lucideIcon'>

export type { LucideIconWrapperProps, InstUIIconOwnProps, LucideIconStyle }

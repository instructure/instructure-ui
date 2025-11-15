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

import type { LucideIconTheme } from './theme'
import type { LucideIconStyle } from './props'

interface StyleParams {
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
  color?: string
  rotate?: '0' | '90' | '180' | '270'
  bidirectional?: boolean
  inline?: boolean
  themeOverride?: Partial<LucideIconTheme>
}

/**
 * Generates the style object from the theme and provided props.
 *
 * This function is called by useStyle hook and generates dynamic CSS-in-JS
 * styles based on the component theme and current prop values.
 *
 * @param componentTheme The theme variable object
 * @param params The reactive parameters (props that affect styling)
 * @return The final style object, which will be used in the component
 */
const generateStyle = (
  componentTheme: LucideIconTheme,
  params: StyleParams
): LucideIconStyle => {
  const { color, rotate = '0', bidirectional = true, inline = true } = params

  // Color mapping (semantic colors from theme)
  // Note: Size is no longer applied here - it's passed directly to Lucide as pixels
  const colorVariants = {
    inherit: { color: 'inherit' },
    primary: { color: componentTheme.primaryColor },
    secondary: { color: componentTheme.secondaryColor },
    'primary-inverse': { color: componentTheme.primaryInverseColor },
    'secondary-inverse': { color: componentTheme.secondaryInverseColor },
    success: { color: componentTheme.successColor },
    error: { color: componentTheme.errorColor },
    warning: { color: componentTheme.warningColor },
    alert: { color: componentTheme.alertColor },
    brand: { color: componentTheme.brandColor }
  }

  // Rotation transforms (LTR context)
  const rotateVariants = {
    '0': {},
    '90': { transform: 'rotate(90deg)' },
    '180': { transform: 'rotate(180deg)' },
    '270': { transform: 'rotate(270deg)' }
  }

  // Bidirectional + rotation (RTL context) - flip + rotate
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
      lineHeight: 0, // Remove extra line-height to prevent wrapper from being taller than icon
      fontSize: 0, // Remove font-size to prevent wrapper from having its own dimensions

      // Apply color (semantic or custom)
      ...(color &&
        (colorVariants[color as keyof typeof colorVariants] || { color })),

      // Apply rotation in LTR
      ...rotateVariants[rotate],

      // Apply bidirectional flip + rotation in RTL
      ...(bidirectional && {
        '[dir="rtl"] &': bidirectionalRotateVariants[rotate]
      })
    }
  }
}

export default generateStyle

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

const ThemeablePropValues = {
  SHADOW_TYPES: {
    resting: 'resting',
    above: 'above',
    topmost: 'topmost',
    none: 'none'
  },

  STACKING_TYPES: {
    deepest: 'deepest',
    below: 'below',
    resting: 'resting',
    above: 'above',
    topmost: 'topmost'
  },

  BORDER_WIDTHS: {
    0: '0',
    none: 'none',
    small: 'small',
    medium: 'medium',
    large: 'large'
  },

  BORDER_RADII: {
    0: '0',
    none: 'none',
    small: 'small',
    medium: 'medium',
    large: 'large',
    circle: 'circle',
    pill: 'pill'
  },

  BACKGROUNDS: {
    default: 'default',
    inverse: 'inverse',
    transparent: 'transparent'
  },

  SIZES: {
    xSmall: 'x-small',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'x-large'
  },

  SPACING: {
    0: '0',
    none: 'none',
    auto: 'auto',
    xxxSmall: 'xxx-small',
    xxSmall: 'xx-small',
    xSmall: 'x-small',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'x-large',
    xxLarge: 'xx-large'
  }
} as const

// SPACING
type SpacingKeys = keyof typeof ThemeablePropValues.SPACING
type SpacingValues = typeof ThemeablePropValues.SPACING[SpacingKeys]
type Spacing =
  | `${SpacingValues}`
  | `${SpacingValues} ${SpacingValues}`
  | `${SpacingValues} ${SpacingValues} ${SpacingValues}`
  | `${SpacingValues} ${SpacingValues} ${SpacingValues} ${SpacingValues}`

// SHADOW_TYPES
type ShadowKeys = keyof typeof ThemeablePropValues.SHADOW_TYPES
type Shadow = typeof ThemeablePropValues.SHADOW_TYPES[ShadowKeys]

// STACKING_TYPES
type StackingKeys = keyof typeof ThemeablePropValues.STACKING_TYPES
type Stacking = typeof ThemeablePropValues.STACKING_TYPES[StackingKeys]

// BACKGROUNDS
type BackgroundKeys = keyof typeof ThemeablePropValues.BACKGROUNDS
type Background = typeof ThemeablePropValues.BACKGROUNDS[BackgroundKeys]

// BORDER_RADII
type BorderRadiiKeys = keyof typeof ThemeablePropValues.BORDER_RADII
type BorderRadiiValues = typeof ThemeablePropValues.BORDER_RADII[BorderRadiiKeys]
type BorderRadii =
  | `${BorderRadiiValues}`
  | `${BorderRadiiValues} ${BorderRadiiValues}`
  | `${BorderRadiiValues} ${BorderRadiiValues} ${BorderRadiiValues}`
  | `${BorderRadiiValues} ${BorderRadiiValues} ${BorderRadiiValues} ${BorderRadiiValues}`

// BORDER_WIDTHS
type BorderWidthKeys = keyof typeof ThemeablePropValues.BORDER_WIDTHS
type BorderWidthValues = typeof ThemeablePropValues.BORDER_WIDTHS[BorderWidthKeys]
type BorderWidth =
  | `${BorderWidthValues}`
  | `${BorderWidthValues} ${BorderWidthValues}`
  | `${BorderWidthValues} ${BorderWidthValues} ${BorderWidthValues}`
  | `${BorderWidthValues} ${BorderWidthValues} ${BorderWidthValues} ${BorderWidthValues}`

export default ThemeablePropValues
export { ThemeablePropValues }
export type {
  SpacingValues,
  Spacing,
  Shadow,
  Stacking,
  Background,
  BorderRadiiValues,
  BorderRadii,
  BorderWidthValues,
  BorderWidth
}

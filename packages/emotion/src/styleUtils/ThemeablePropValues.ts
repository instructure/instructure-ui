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

import type { CSSShorthandValue } from '@instructure/shared-types'

const ThemeablePropValues = {
  SHADOW_TYPES: {
    resting: 'resting',
    above: 'above',
    topmost: 'topmost',
    none: 'none',
    elevation1: 'elevation1',
    elevation2: 'elevation2',
    elevation3: 'elevation3',
    elevation4: 'elevation4'
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
    mediumSmall: 'mediumSmall',
    medium: 'medium',
    large: 'large',
    xLarge: 'x-large',
    xxLarge: 'xx-large'
  }
} as const

// SPACING
type OldSpacingKeys = keyof typeof ThemeablePropValues.SPACING
/**
 * @deprecated Era-1 (legacy) spacing keywords. Still resolved at runtime, but
 * prefer the current `CurrentSpacingValues` dot-path tokens (e.g. `general.spaceMd`).
 * See https://instructure.design/layout-spacing.
 */
type OldSpacingValues = (typeof ThemeablePropValues.SPACING)[OldSpacingKeys]
/**
 * @deprecated Era-2 spacing tokens (the `space0`–`space60` and flat semantic set)
 * have been phased out. Still resolved at runtime, but prefer the current
 * `CurrentSpacingValues` dot-path tokens (e.g. `general.spaceMd`, `gap.cards.md`).
 * See https://instructure.design/layout-spacing.
 */
type NewSpacingValues =
  | 'space0'
  | 'space2'
  | 'space4'
  | 'space8'
  | 'space12'
  | 'space16'
  | 'space24'
  | 'space36'
  | 'space48'
  | 'space60'
  | 'sections'
  | 'sectionElements'
  | 'trayElements'
  | 'modalElements'
  | 'moduleElements'
  | 'paddingCardLarge'
  | 'paddingCardMedium'
  | 'paddingCardSmall'
  | 'selects'
  | 'textareas'
  | 'inputFields'
  | 'checkboxes'
  | 'radios'
  | 'toggles'
  | 'buttons'
  | 'tags'
  | 'statusIndicators'
  | 'dataPoints'
/**
 * Current (era-3) spacing tokens. Referenced via dot-path notation and resolved
 * against the new theme's `sharedTokens.spacing` map (see
 * `@instructure/ui-themes` `newThemeTokens`). These are the recommended values
 * for the `margin`/`padding` props. See https://instructure.design/layout-spacing.
 */
type CurrentSpacingValues =
  // general t-shirt scale
  | 'general.spaceNone'
  | 'general.space2xs'
  | 'general.spaceXs'
  | 'general.spaceSm'
  | 'general.spaceMd'
  | 'general.spaceLg'
  | 'general.spaceXl'
  | 'general.space2xl'
  // semantic gap tokens
  | 'gap.sections'
  | 'gap.buttons'
  | 'gap.cards.sm'
  | 'gap.cards.md'
  | 'gap.cards.lg'
  | 'gap.cards.nestedContainers.sm'
  | 'gap.cards.nestedContainers.md'
  | 'gap.cards.nestedContainers.lg'
  | 'gap.inputs.horizontal'
  | 'gap.inputs.vertical'
  // semantic padding tokens
  | 'padding.card.sm'
  | 'padding.card.md'
  | 'padding.card.lg'
type SpacingValues = CurrentSpacingValues | OldSpacingValues | NewSpacingValues
// adding `(string & {})` allows to use any string while still allowing specific string values to be suggested by IDEs
type Spacing = SpacingValues | (string & {})

// SHADOW_TYPES
type ShadowKeys = keyof typeof ThemeablePropValues.SHADOW_TYPES
type Shadow = (typeof ThemeablePropValues.SHADOW_TYPES)[ShadowKeys]

// STACKING_TYPES
type StackingKeys = keyof typeof ThemeablePropValues.STACKING_TYPES
type Stacking = (typeof ThemeablePropValues.STACKING_TYPES)[StackingKeys]

// BACKGROUNDS
type BackgroundKeys = keyof typeof ThemeablePropValues.BACKGROUNDS
type Background = (typeof ThemeablePropValues.BACKGROUNDS)[BackgroundKeys]

// BORDER_WIDTHS
type BorderWidthKeys = keyof typeof ThemeablePropValues.BORDER_WIDTHS
type BorderWidthValues =
  (typeof ThemeablePropValues.BORDER_WIDTHS)[BorderWidthKeys]
type BorderWidth = CSSShorthandValue<BorderWidthValues>

export default ThemeablePropValues
export { ThemeablePropValues }
export type {
  SpacingValues,
  CurrentSpacingValues,
  Spacing,
  Shadow,
  Stacking,
  Background,
  BorderWidthValues,
  BorderWidth
}

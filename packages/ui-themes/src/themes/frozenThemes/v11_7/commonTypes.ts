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

import type {
  TokenTextCaseValue,
  TokenTextDecorationValue
} from '@tokens-studio/types'
import type { ComponentTypes } from './componentTypes'

// This type is broken in Token Studio, use their version when the bug is fixed
export type TokenBoxshadowValueInst = {
  color: string
  type: 'dropShadow' | 'innerShadow' // BUG: this is an enum in the original
  x: string | number
  y: string | number
  blur: string | number
  spread: string | number
  blendMode?: string
}
// This type is broken in Token Studio, use their version when the bug is fixed
export type TokenTypographyValueInst = {
  fontFamily?: string
  fontWeight?: string | number // BUG: this is just 'string' in the original
  fontSize?: string
  lineHeight?: string | number
  letterSpacing?: string
  paragraphSpacing?: string
  paragraphIndent?: string
  textCase?: TokenTextCaseValue
  textDecoration?: TokenTextDecorationValue
}

export type SharedTokens = {
  borderRadius: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
    full: string
    card: {
      sm: string
      md: string
      lg: string
      nestedContainer: { sm: string; md: string; lg: string }
    }
  }
  legacy: {
    spacing: {
      xxxSmall: string
      xxSmall: string
      xSmall: string
      small: string
      mediumSmall: string
      medium: string
      large: string
      xLarge: string
      xxLarge: string
      space0: string
      space2: string
      space4: string
      space8: string
      space12: string
      space16: string
      space24: string
      space36: string
      space48: string
      space60: string
      sections: string
      sectionElements: string
      trayElements: string
      modalElements: string
      moduleElements: string
      paddingCardLarge: string
      paddingCardMedium: string
      paddingCardSmall: string
      selects: string
      textareas: string
      inputFields: string
      checkboxes: string
      radios: string
      toggles: string
      buttons: string
      tags: string
      statusIndicators: string
      dataPoints: string
    }
    radiusSmall: string
    radiusMedium: string
    radiusLarge: string
  }
  boxShadow: {
    /** Elevated base surfaces: Persistent UI and everyday interactive surfaces like navigation, cards, inputs, and buttons. */
    elevation1: { '0': TokenBoxshadowValueInst; '1': TokenBoxshadowValueInst }
    /** Menus & Popovers: Anchored, contextual layers such as dropdowns, popovers, and context menus. */
    elevation2: { '0': TokenBoxshadowValueInst; '1': TokenBoxshadowValueInst }
    /** Floating UI: Detached, transient elements like tooltips, hover cards, and floating actions. */
    elevation3: { '0': TokenBoxshadowValueInst; '1': TokenBoxshadowValueInst }
    /** Dialogs & Panels: Top-priority surfaces including modals, alerts, and side panels. */
    elevation4: { '0': TokenBoxshadowValueInst; '1': TokenBoxshadowValueInst }
  }
  spacing: {
    general: {
      space2xs: string
      spaceXs: string
      spaceSm: string
      spaceMd: string
      spaceLg: string
      spaceXl: string
      space2xl: string
      spaceNone: string
    }
    gap: {
      sections: string
      buttons: string
      cards: {
        sm: string
        md: string
        lg: string
        nestedContainers: { sm: string; md: string; lg: string }
      }
      inputs: { horizontal: string; vertical: string }
    }
    padding: { card: { sm: string; md: string; lg: string } }
  }
  focusOutline: {
    offset: string
    inset: string
    width: string
    infoColor: string
    onColor: string
    successColor: string
    dangerColor: string
    style: string
  }
  background: {
    containerColor: string
    baseColor: string
    pageColor: string
    mutedColor: string
    brandColor: string
    onColor: string
    /** Background color for inverse components. Dark grey in light mode; light grey in dark mode. */
    inverseColor: string
    successColor: string
    errorColor: string
    warningColor: string
    infoColor: string
    aiTopGradientColor: string
    aiBottomGradientColor: string
    aiTextColor: string
    accentAsh: string
    accentAurora: string
    accentBlue: string
    accentGreen: string
    accentGrey: string
    accentHoney: string
    accentOrange: string
    accentPlum: string
    accentRed: string
    accentSea: string
    accentSky: string
    accentStone: string
    accentViolet: string
  }
  stroke: {
    baseColor: string
    mutedColor: string
    strongColor: string
    brandColor: string
    successColor: string
    errorColor: string
    warningColor: string
    infoColor: string
    aiTopGradientColor: string
    aiBottomGradientColor: string
    accentAsh: string
    accentAurora: string
    accentBlue: string
    accentGreen: string
    accentGrey: string
    accentHoney: string
    accentOrange: string
    accentPlum: string
    accentRed: string
    accentSea: string
    accentSky: string
    accentStone: string
    accentViolet: string
    visualSeparator: string
  }
  strokeWidth: { sm: string; md: string; lg: string }
}

export type BaseTheme<P = any, S = any> = {
  primitives: P
  semantics: (primitives: P) => S
  sharedTokens: (semantics: S) => SharedTokens
  components: ComponentTypes
}

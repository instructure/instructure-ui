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
  breakpoints: {
    /** Compact layouts stack here. Typical for phones in portrait orientation. */
    sm: string
    /** The point where single-column layouts typically become two-column. Typical for tablets and large phones in landscape. */
    md: string
    /** Multi-column and side-by-side layouts are practical. Typical for laptops and standard desktop screens. */
    lg: string
    /** Content areas have more room. Typical for large monitors where layouts can use wider columns and more generous spacing. */
    xl: string
  }
  borderRadius: {
    /** Subtle rounding for small, compact elements */
    xs: string
    /** Light rounding for compact interactive elements */
    sm: string
    /** Default rounding for most elements */
    md: string
    /** Rounding for larger container elements */
    lg: string
    /** Rounding for prominent, elevated surfaces */
    xl: string
    /** Rounding for large feature surfaces */
    xxl: string
    /** Fully rounded, pill-shaped elements */
    full: string
    card: {
      /** Corner radius for a small container */
      sm: string
      /** Corner radius for a medium container */
      md: string
      /** Corner radius for a large container */
      lg: string
      nestedContainer: {
        /** Corner radius for a small container nested inside another */
        sm: string
        /** Corner radius for a medium container nested inside another */
        md: string
        /** Corner radius for a large container nested inside another */
        lg: string
      }
    }
  }
  legacy: {
    spacing: {
      /** Legacy token - avoid in new work */
      xxxSmall: string
      /** Legacy token - avoid in new work */
      xxSmall: string
      /** Legacy token - avoid in new work */
      xSmall: string
      /** Legacy token - avoid in new work */
      small: string
      /** Legacy token - avoid in new work */
      mediumSmall: string
      /** Legacy token - avoid in new work */
      medium: string
      /** Legacy token - avoid in new work */
      large: string
      /** Legacy token - avoid in new work */
      xLarge: string
      /** Legacy token - avoid in new work */
      xxLarge: string
      /** Legacy token - avoid in new work */
      space0: string
      /** Legacy token - avoid in new work */
      space2: string
      /** Legacy token - avoid in new work */
      space4: string
      /** Legacy token - avoid in new work */
      space8: string
      /** Legacy token - avoid in new work */
      space12: string
      /** Legacy token - avoid in new work */
      space16: string
      /** Legacy token - avoid in new work */
      space24: string
      /** Legacy token - avoid in new work */
      space36: string
      /** Legacy token - avoid in new work */
      space48: string
      /** Legacy token - avoid in new work */
      space60: string
      /** Legacy token - avoid in new work */
      sections: string
      /** Legacy token - avoid in new work */
      sectionElements: string
      /** Legacy token - avoid in new work */
      trayElements: string
      /** Legacy token - avoid in new work */
      modalElements: string
      /** Legacy token - avoid in new work */
      moduleElements: string
      /** Legacy token - avoid in new work */
      paddingCardLarge: string
      /** Legacy token - avoid in new work */
      paddingCardMedium: string
      /** Legacy token - avoid in new work */
      paddingCardSmall: string
      /** Legacy token - avoid in new work */
      selects: string
      /** Legacy token - avoid in new work */
      textareas: string
      /** Legacy token - avoid in new work */
      inputFields: string
      /** Legacy token - avoid in new work */
      checkboxes: string
      /** Legacy token - avoid in new work */
      radios: string
      /** Legacy token - avoid in new work */
      toggles: string
      /** Legacy token - avoid in new work */
      buttons: string
      /** Legacy token - avoid in new work */
      tags: string
      /** Legacy token - avoid in new work */
      statusIndicators: string
      /** Legacy token - avoid in new work */
      dataPoints: string
    }
    /** Legacy token - avoid in new work */
    radiusSmall: string
    /** Legacy token - avoid in new work */
    radiusMedium: string
    /** Legacy token - avoid in new work */
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
      /** Tightest spacing, for closely related elements */
      space2xs: string
      /** Extra small spacing between related elements */
      spaceXs: string
      /** Small spacing between related elements */
      spaceSm: string
      /** Default spacing between related elements */
      spaceMd: string
      /** Spacing for separating distinct groups of content */
      spaceLg: string
      /** Spacing for separating major layout regions */
      spaceXl: string
      /** Largest spacing, for separating high-level sections */
      space2xl: string
      /** Zero spacing, for flush layouts */
      spaceNone: string
    }
    gap: {
      /** Gap between major layout sections */
      sections: string
      /** Gap between grouped interactive controls */
      buttons: string
      cards: {
        /** Gap between small containers in a group */
        sm: string
        /** Gap between medium containers in a group */
        md: string
        /** Gap between large containers in a group */
        lg: string
        nestedContainers: {
          /** Gap between containers nested in a small parent */
          sm: string
          /** Gap between containers nested in a medium parent */
          md: string
          /** Gap between containers nested in a large parent */
          lg: string
        }
      }
      inputs: {
        /** Horizontal gap between adjacent form controls */
        horizontal: string
        /** Vertical gap between stacked form controls */
        vertical: string
      }
    }
    padding: {
      card: {
        /** Inner padding for a small container */
        sm: string
        /** Inner padding for a medium container */
        md: string
        /** Inner padding for a large container */
        lg: string
      }
    }
  }
  focusOutline: {
    /** Gap between an element and its focus outline */
    offset: string
    /** Inward offset for drawing the focus outline inside an element */
    inset: string
    /** Thickness of the focus outline */
    width: string
    /** Default focus outline color */
    infoColor: string
    /** Focus outline color on colored backgrounds */
    onColor: string
    /** Focus outline color for success/confirm actions */
    successColor: string
    /** Focus outline color for destructive actions */
    dangerColor: string
    /** Stroke style of the focus outline */
    style: string
  }
  background: {
    /** Background for a contained surface, like a panel */
    containerColor: string
    /** Default background for standard surfaces */
    baseColor: string
    /** Background for the overall page canvas */
    pageColor: string
    /** De-emphasized background color */
    mutedColor: string
    /** Brand-colored background */
    brandColor: string
    /** Background for an element placed on a colored surface */
    onColor: string
    /** Background color for inverse components. Dark grey in light mode; light grey in dark mode. */
    inverseColor: string
    /** Background color signaling success */
    successColor: string
    /** Background color signaling an error */
    errorColor: string
    /** Background color signaling a warning */
    warningColor: string
    /** Background color signaling information */
    infoColor: string
    /** Top gradient color for AI-related backgrounds */
    aiTopGradientColor: string
    /** Bottom gradient color for AI-related backgrounds */
    aiBottomGradientColor: string
    /** Background color behind text on AI-related surfaces */
    aiTextColor: string
    /** Accent background color for custom, non-semantic UI */
    accentAsh: string
    /** Accent background color for custom, non-semantic UI */
    accentAurora: string
    /** Accent background color for custom, non-semantic UI */
    accentBlue: string
    /** Accent background color for custom, non-semantic UI */
    accentGreen: string
    /** Accent background color for custom, non-semantic UI */
    accentGrey: string
    /** Accent background color for custom, non-semantic UI */
    accentHoney: string
    /** Accent background color for custom, non-semantic UI */
    accentOrange: string
    /** Accent background color for custom, non-semantic UI */
    accentPlum: string
    /** Accent background color for custom, non-semantic UI */
    accentRed: string
    /** Accent background color for custom, non-semantic UI */
    accentSea: string
    /** Accent background color for custom, non-semantic UI */
    accentSky: string
    /** Accent background color for custom, non-semantic UI */
    accentStone: string
    /** Accent background color for custom, non-semantic UI */
    accentViolet: string
  }
  stroke: {
    /** Default border color */
    baseColor: string
    /** De-emphasized border color */
    mutedColor: string
    /** High-contrast border color for emphasis */
    strongColor: string
    /** Brand-colored border */
    brandColor: string
    /** Border color signaling success */
    successColor: string
    /** Border color signaling an error */
    errorColor: string
    /** Border color signaling a warning */
    warningColor: string
    /** Border color signaling information */
    infoColor: string
    /** Top gradient color for AI-related borders */
    aiTopGradientColor: string
    /** Bottom gradient color for AI-related borders */
    aiBottomGradientColor: string
    /** Accent border color for custom, non-semantic UI */
    accentAsh: string
    /** Accent border color for custom, non-semantic UI */
    accentAurora: string
    /** Accent border color for custom, non-semantic UI */
    accentBlue: string
    /** Accent border color for custom, non-semantic UI */
    accentGreen: string
    /** Accent border color for custom, non-semantic UI */
    accentGrey: string
    /** Accent border color for custom, non-semantic UI */
    accentHoney: string
    /** Accent border color for custom, non-semantic UI */
    accentOrange: string
    /** Accent border color for custom, non-semantic UI */
    accentPlum: string
    /** Accent border color for custom, non-semantic UI */
    accentRed: string
    /** Accent border color for custom, non-semantic UI */
    accentSea: string
    /** Accent border color for custom, non-semantic UI */
    accentSky: string
    /** Accent border color for custom, non-semantic UI */
    accentStone: string
    /** Accent border color for custom, non-semantic UI */
    accentViolet: string
    /** Defines visual boundaries between chart elements. */
    visualSeparator: string
  }
  strokeWidth: {
    /** Thin border for subtle separation */
    sm: string
    /** Default border weight */
    md: string
    /** Heavy border for strong separation */
    lg: string
  }
}

export type BaseTheme<P = any, S = any> = {
  primitives: P
  semantics: (primitives: P) => S
  sharedTokens: (semantic: S) => SharedTokens
  components: ComponentTypes
}

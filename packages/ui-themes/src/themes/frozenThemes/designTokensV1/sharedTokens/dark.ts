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

import type { SharedTokens } from '../commonTypes'
import type { SemanticsDark as Semantics } from '../semantics'

const sharedTokens = (semantic: Semantics): SharedTokens => ({
  breakpoints: {
    sm: semantic.breakpoints.sm,
    md: semantic.breakpoints.md,
    lg: semantic.breakpoints.lg,
    xl: semantic.breakpoints.xl
  },
  borderRadius: {
    xs: semantic.borderRadius.xs,
    sm: semantic.borderRadius.sm,
    md: semantic.borderRadius.md,
    lg: semantic.borderRadius.lg,
    xl: semantic.borderRadius.xl,
    xxl: semantic.borderRadius.xxl,
    full: '999rem',
    card: {
      sm: '0.75rem',
      md: semantic.borderRadius.container.md,
      lg: semantic.borderRadius.container.md,
      nestedContainer: {
        sm: semantic.borderRadius.sm,
        md: semantic.borderRadius.sm,
        lg: semantic.borderRadius.md
      }
    }
  },
  legacy: {
    spacing: {
      xxxSmall: '0.125rem',
      xxSmall: '0.375rem',
      xSmall: '0.5rem',
      small: '0.75rem',
      mediumSmall: '1rem',
      medium: '1.5rem',
      large: '2.25rem',
      xLarge: '3rem',
      xxLarge: '3.75rem',
      space0: '0rem',
      space2: '0.125rem',
      space4: '0.25rem',
      space8: '0.5rem',
      space12: '0.75rem',
      space16: '1rem',
      space24: '1.5rem',
      space36: '2.25rem',
      space48: '3rem',
      space60: '3.75rem',
      sections: '2.25rem',
      sectionElements: '1.5em',
      trayElements: '1.5em',
      modalElements: '1.5em',
      moduleElements: '1em',
      paddingCardLarge: '1.5rem',
      paddingCardMedium: '1rem',
      paddingCardSmall: '0.75rem',
      selects: '1rem',
      textareas: '1rem',
      inputFields: '1rem',
      checkboxes: '1rem',
      radios: '1rem',
      toggles: '1rem',
      buttons: '0.75rem',
      tags: '0.75rem',
      statusIndicators: '0.75rem',
      dataPoints: '0.75rem'
    },
    radiusSmall: '0.125rem',
    radiusMedium: '0.25rem',
    radiusLarge: '0.5rem'
  },
  boxShadow: {
    elevation1: {
      0: {
        x: semantic.dropShadow.x.elevation1.dropshadow1,
        y: semantic.dropShadow.y.elevation1.dropshadow1,
        blur: semantic.dropShadow.blur.elevation1.dropshadow1,
        spread: semantic.dropShadow.spread.elevation1.dropshadow1,
        color: semantic.color.dropShadow.shadowColor1,
        type: 'dropShadow'
      },
      1: {
        x: semantic.dropShadow.x.elevation1.dropshadow1,
        y: semantic.dropShadow.y.elevation1.dropshadow2,
        blur: semantic.dropShadow.blur.elevation1.dropshadow2,
        spread: semantic.dropShadow.spread.elevation1.dropshadow2,
        color: semantic.color.dropShadow.shadowColor2,
        type: 'dropShadow'
      }
    },
    elevation2: {
      0: {
        x: semantic.dropShadow.x.elevation2.dropshadow1,
        y: semantic.dropShadow.y.elevation2.dropshadow1,
        blur: semantic.dropShadow.blur.elevation2.dropshadow1,
        spread: semantic.dropShadow.spread.elevation2.dropshadow1,
        color: semantic.color.dropShadow.shadowColor2,
        type: 'dropShadow'
      },
      1: {
        x: semantic.dropShadow.x.elevation2.dropshadow2,
        y: semantic.dropShadow.y.elevation2.dropshadow2,
        blur: semantic.dropShadow.blur.elevation2.dropshadow2,
        spread: semantic.dropShadow.spread.elevation2.dropshadow2,
        color: semantic.color.dropShadow.shadowColor1,
        type: 'dropShadow'
      }
    },
    elevation3: {
      0: {
        x: semantic.dropShadow.x.elevation3.dropshadow1,
        y: semantic.dropShadow.y.elevation3.dropshadow1,
        blur: semantic.dropShadow.blur.elevation3.dropshadow1,
        spread: semantic.dropShadow.spread.elevation3.dropshadow1,
        color: semantic.color.dropShadow.shadowColor2,
        type: 'dropShadow'
      },
      1: {
        x: semantic.dropShadow.x.elevation3.dropshadow2,
        y: semantic.dropShadow.y.elevation3.dropshadow2,
        blur: semantic.dropShadow.blur.elevation3.dropshadow2,
        spread: semantic.dropShadow.spread.elevation3.dropshadow2,
        color: semantic.color.dropShadow.shadowColor1,
        type: 'dropShadow'
      }
    },
    elevation4: {
      0: {
        x: semantic.dropShadow.x.elevation4.dropshadow1,
        y: semantic.dropShadow.y.elevation4.dropshadow1,
        blur: semantic.dropShadow.blur.elevation4.dropshadow1,
        spread: semantic.dropShadow.spread.elevation4.dropshadow1,
        color: semantic.color.dropShadow.shadowColor2,
        type: 'dropShadow'
      },
      1: {
        x: semantic.dropShadow.x.elevation4.dropshadow2,
        y: semantic.dropShadow.y.elevation4.dropshadow2,
        blur: semantic.dropShadow.blur.elevation4.dropshadow2,
        spread: semantic.dropShadow.spread.elevation4.dropshadow2,
        color: semantic.color.dropShadow.shadowColor1,
        type: 'dropShadow'
      }
    }
  },
  spacing: {
    general: {
      space2xs: semantic.spacing.space2xs,
      spaceXs: semantic.spacing.spaceXs,
      spaceSm: semantic.spacing.spaceSm,
      spaceMd: semantic.spacing.spaceMd,
      spaceLg: semantic.spacing.spaceLg,
      spaceXl: semantic.spacing.spaceXl,
      space2xl: semantic.spacing.space2xl,
      spaceNone: '0rem'
    },
    gap: {
      sections: semantic.spacing.gap.sections,
      buttons: semantic.spacing.spaceMd,
      cards: {
        sm: semantic.spacing.gap.cards.sm,
        md: semantic.spacing.gap.cards.md,
        lg: semantic.spacing.gap.cards.lg,
        nestedContainers: {
          sm: semantic.spacing.spaceSm,
          md: semantic.spacing.spaceMd,
          lg: semantic.spacing.spaceLg
        }
      },
      inputs: {
        horizontal: semantic.spacing.gap.inputs.horizontal,
        vertical: semantic.spacing.gap.inputs.vertical
      }
    },
    padding: {
      card: {
        sm: semantic.spacing.padding.container.xxs,
        md: semantic.spacing.padding.container.xs,
        lg: semantic.spacing.padding.container.sm
      }
    }
  },
  focusOutline: {
    offset: semantic.spacing.space2xs,
    inset: '0rem',
    width: semantic.borderWidth.md,
    infoColor: semantic.color.stroke.interactive.focusRing.base,
    onColor: semantic.color.stroke.interactive.focusRing.onColor,
    successColor: semantic.color.stroke.interactive.action.success.base,
    dangerColor: semantic.color.stroke.interactive.action.destructive.base,
    style: 'solid'
  },
  background: {
    containerColor: semantic.color.background.container,
    baseColor: semantic.color.background.base,
    pageColor: semantic.color.background.page,
    mutedColor: semantic.color.background.muted,
    brandColor: semantic.color.background.brand,
    onColor: semantic.color.background.onColor,
    inverseColor: semantic.color.background.inverse,
    successColor: semantic.color.background.success,
    errorColor: semantic.color.background.error,
    infoColor: semantic.color.background.info,
    warningColor: semantic.color.background.warning,
    aiTopGradientColor: semantic.color.background.aiTopGradient,
    aiBottomGradientColor: semantic.color.background.aiBottomGradient,
    aiTextColor: semantic.color.background.aiText,
    accentAsh: semantic.color.background.accent.ash,
    accentAurora: semantic.color.background.accent.aurora,
    accentBlue: semantic.color.background.accent.blue,
    accentGreen: semantic.color.background.accent.green,
    accentGrey: semantic.color.background.accent.grey,
    accentHoney: semantic.color.background.accent.honey,
    accentOrange: semantic.color.background.accent.orange,
    accentPlum: semantic.color.background.accent.plum,
    accentRed: semantic.color.background.accent.red,
    accentSea: semantic.color.background.accent.sea,
    accentSky: semantic.color.background.accent.sky,
    accentStone: semantic.color.background.accent.stone,
    accentViolet: semantic.color.background.accent.violet
  },
  stroke: {
    baseColor: semantic.color.stroke.base,
    mutedColor: semantic.color.stroke.muted,
    strongColor: semantic.color.stroke.strong,
    brandColor: semantic.color.stroke.brand,
    successColor: semantic.color.stroke.success,
    errorColor: semantic.color.stroke.error,
    warningColor: semantic.color.stroke.warning,
    infoColor: semantic.color.stroke.info,
    aiTopGradientColor: semantic.color.stroke.aiTopGradient,
    aiBottomGradientColor: semantic.color.stroke.aiBottomGradient,
    accentAsh: semantic.color.stroke.accent.ash,
    accentAurora: semantic.color.stroke.accent.aurora,
    accentBlue: semantic.color.stroke.accent.blue,
    accentGreen: semantic.color.stroke.accent.green,
    accentGrey: semantic.color.stroke.accent.grey,
    accentHoney: semantic.color.stroke.accent.honey,
    accentOrange: semantic.color.stroke.accent.orange,
    accentPlum: semantic.color.stroke.accent.plum,
    accentRed: semantic.color.stroke.accent.red,
    accentSea: semantic.color.stroke.accent.sea,
    accentSky: semantic.color.stroke.accent.sky,
    accentStone: semantic.color.background.accent.stone,
    accentViolet: semantic.color.background.accent.violet,
    visualSeparator: semantic.color.background.container
  },
  strokeWidth: {
    sm: semantic.borderWidth.sm,
    md: semantic.borderWidth.md,
    lg: semantic.borderWidth.lg
  }
})
export default sharedTokens

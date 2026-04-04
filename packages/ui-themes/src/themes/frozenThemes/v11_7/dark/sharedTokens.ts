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

import { SharedTokens } from '../commonTypes'
import { Semantics } from './semantics'

const sharedTokens = (semantics: Semantics): SharedTokens => ({
  borderRadius: {
    xs: semantics.borderRadius.xs,
    sm: semantics.borderRadius.sm,
    md: semantics.borderRadius.md,
    lg: semantics.borderRadius.lg,
    xl: semantics.borderRadius.xl,
    xxl: semantics.borderRadius.xxl,
    full: '999rem',
    card: {
      sm: '0.75rem',
      md: semantics.borderRadius.container.md,
      lg: semantics.borderRadius.container.lg,
      nestedContainer: {
        sm: semantics.borderRadius.sm,
        md: semantics.borderRadius.sm,
        lg: semantics.borderRadius.md
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
        x: semantics.dropShadow.x.elevation1.dropshadow1,
        y: semantics.dropShadow.y.elevation1.dropshadow1,
        blur: semantics.dropShadow.blur.elevation1.dropshadow1,
        spread: semantics.dropShadow.spread.elevation1.dropshadow1,
        color: semantics.color.dropShadow.shadowColor1,
        type: 'dropShadow'
      },
      1: {
        x: semantics.dropShadow.x.elevation1.dropshadow2,
        y: semantics.dropShadow.y.elevation1.dropshadow2,
        blur: semantics.dropShadow.blur.elevation1.dropshadow2,
        spread: semantics.dropShadow.spread.elevation1.dropshadow2,
        color: semantics.color.dropShadow.shadowColor2,
        type: 'dropShadow'
      }
    },
    elevation2: {
      0: {
        x: semantics.dropShadow.x.elevation2.dropshadow1,
        y: semantics.dropShadow.y.elevation2.dropshadow1,
        blur: semantics.dropShadow.blur.elevation2.dropshadow1,
        spread: semantics.dropShadow.spread.elevation2.dropshadow1,
        color: semantics.color.dropShadow.shadowColor2,
        type: 'dropShadow'
      },
      1: {
        x: semantics.dropShadow.x.elevation2.dropshadow2,
        y: semantics.dropShadow.y.elevation2.dropshadow2,
        blur: semantics.dropShadow.blur.elevation2.dropshadow2,
        spread: semantics.dropShadow.spread.elevation2.dropshadow2,
        color: semantics.color.dropShadow.shadowColor1,
        type: 'dropShadow'
      }
    },
    elevation3: {
      0: {
        x: semantics.dropShadow.x.elevation3.dropshadow1,
        y: semantics.dropShadow.y.elevation3.dropshadow1,
        blur: semantics.dropShadow.blur.elevation3.dropshadow1,
        spread: semantics.dropShadow.spread.elevation3.dropshadow1,
        color: semantics.color.dropShadow.shadowColor2,
        type: 'dropShadow'
      },
      1: {
        x: semantics.dropShadow.x.elevation3.dropshadow2,
        y: semantics.dropShadow.y.elevation3.dropshadow2,
        blur: semantics.dropShadow.blur.elevation3.dropshadow2,
        spread: semantics.dropShadow.spread.elevation3.dropshadow2,
        color: semantics.color.dropShadow.shadowColor1,
        type: 'dropShadow'
      }
    },
    elevation4: {
      0: {
        x: semantics.dropShadow.x.elevation4.dropshadow1,
        y: semantics.dropShadow.y.elevation4.dropshadow1,
        blur: semantics.dropShadow.blur.elevation4.dropshadow1,
        spread: semantics.dropShadow.spread.elevation4.dropshadow1,
        color: semantics.color.dropShadow.shadowColor2,
        type: 'dropShadow'
      },
      1: {
        x: semantics.dropShadow.x.elevation4.dropshadow2,
        y: semantics.dropShadow.y.elevation4.dropshadow2,
        blur: semantics.dropShadow.blur.elevation4.dropshadow2,
        spread: semantics.dropShadow.spread.elevation4.dropshadow2,
        color: semantics.color.dropShadow.shadowColor1,
        type: 'dropShadow'
      }
    }
  },
  spacing: {
    general: {
      space2xs: semantics.spacing.space2xs,
      spaceXs: semantics.spacing.spaceXs,
      spaceSm: semantics.spacing.spaceSm,
      spaceMd: semantics.spacing.spaceMd,
      spaceLg: semantics.spacing.spaceLg,
      spaceXl: semantics.spacing.spaceXl,
      space2xl: semantics.spacing.space2xl,
      spaceNone: '0rem'
    },
    gap: {
      sections: semantics.spacing.gap.sections,
      buttons: semantics.spacing.spaceMd,
      cards: {
        sm: semantics.spacing.gap.cards.sm,
        md: semantics.spacing.gap.cards.md,
        lg: semantics.spacing.gap.cards.lg,
        nestedContainers: {
          sm: semantics.spacing.spaceSm,
          md: semantics.spacing.spaceMd,
          lg: semantics.spacing.spaceLg
        }
      },
      inputs: {
        horizontal: semantics.spacing.gap.inputs.horizontal,
        vertical: semantics.spacing.gap.inputs.vertical
      }
    },
    padding: {
      card: {
        sm: semantics.spacing.padding.container.xxs,
        md: semantics.spacing.padding.container.xs,
        lg: semantics.spacing.padding.container.sm
      }
    }
  },
  focusOutline: {
    offset: semantics.spacing.space2xs,
    inset: '0rem',
    width: semantics.borderWidth.md,
    infoColor: semantics.color.stroke.interactive.focusRing.base,
    onColor: semantics.color.stroke.interactive.focusRing.onColor,
    successColor: semantics.color.stroke.interactive.action.success.base,
    dangerColor: semantics.color.stroke.interactive.action.destructive.base,
    style: 'solid'
  },
  background: {
    containerColor: semantics.color.background.container,
    baseColor: semantics.color.background.base,
    pageColor: semantics.color.background.page,
    mutedColor: semantics.color.background.muted,
    brandColor: semantics.color.background.brand,
    onColor: semantics.color.background.onColor,
    inverseColor: semantics.color.background.inverse,
    successColor: semantics.color.background.success,
    errorColor: semantics.color.background.error,
    infoColor: semantics.color.background.info,
    warningColor: semantics.color.background.warning,
    aiTopGradientColor: semantics.color.background.aiTopGradient,
    aiBottomGradientColor: semantics.color.background.aiBottomGradient,
    aiTextColor: semantics.color.background.aiText,
    accentAsh: semantics.color.background.accent.ash,
    accentAurora: semantics.color.background.accent.aurora,
    accentBlue: semantics.color.background.accent.blue,
    accentGreen: semantics.color.background.accent.green,
    accentGrey: semantics.color.background.accent.grey,
    accentHoney: semantics.color.background.accent.honey,
    accentOrange: semantics.color.background.accent.orange,
    accentPlum: semantics.color.background.accent.plum,
    accentRed: semantics.color.background.accent.red,
    accentSea: semantics.color.background.accent.sea,
    accentSky: semantics.color.background.accent.sky,
    accentStone: semantics.color.background.accent.stone,
    accentViolet: semantics.color.background.accent.violet
  },
  stroke: {
    baseColor: semantics.color.stroke.base,
    mutedColor: semantics.color.stroke.muted,
    strongColor: semantics.color.stroke.strong,
    brandColor: semantics.color.stroke.brand,
    successColor: semantics.color.stroke.success,
    errorColor: semantics.color.stroke.error,
    warningColor: semantics.color.stroke.warning,
    infoColor: semantics.color.stroke.info,
    aiTopGradientColor: semantics.color.stroke.aiTopGradient,
    aiBottomGradientColor: semantics.color.stroke.aiBottomGradient,
    accentAsh: semantics.color.stroke.accent.ash,
    accentAurora: semantics.color.stroke.accent.aurora,
    accentBlue: semantics.color.stroke.accent.blue,
    accentGreen: semantics.color.stroke.accent.green,
    accentGrey: semantics.color.stroke.accent.grey,
    accentHoney: semantics.color.stroke.accent.honey,
    accentOrange: semantics.color.stroke.accent.orange,
    accentPlum: semantics.color.stroke.accent.plum,
    accentRed: semantics.color.stroke.accent.red,
    accentSea: semantics.color.stroke.accent.sea,
    accentSky: semantics.color.stroke.accent.sky,
    accentStone: semantics.color.background.accent.stone,
    accentViolet: semantics.color.background.accent.violet,
    visualSeparator: semantics.color.background.container
  },
  strokeWidth: {
    sm: semantics.borderWidth.sm,
    md: semantics.borderWidth.md,
    lg: semantics.borderWidth.lg
  }
})
export default sharedTokens

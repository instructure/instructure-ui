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

/** A theme variable that was renamed in the new theming system. */
export interface RenamedVariable {
  /** the new theme variable name */
  to: string
  /** optional note shown to the user about the rename */
  warning?: string
}

/** A theme variable that was removed in the new theming system. */
export interface RemovedVariable {
  /** optional note shown to the user about the removal (e.g. what to use instead) */
  warning?: string
}

/**
 * A theme variable kept under the same name, but changed in a way the codemod
 * can't fix automatically (e.g. its value shape changed). It is left in place
 * and the user is warned to review it.
 */
export interface WarnedVariable {
  /** note shown to the user about what changed and what to check */
  warning: string
}

/** A theme variable that is unchanged for a given variant (left as-is). */
export interface KeptVariable {
  /** marks the token as kept under the same name for this variant */
  keep: true
}

/**
 * A theme variable whose migration depends on a component prop (e.g. Checkbox's
 * `variant`). The same v1 token maps to a different v2 outcome for each variant
 * because the variants now read different token slots. Per-instance
 * `themeOverride` is resolved by reading the static `variant` prop; if it can't
 * be determined statically (dynamic expression), the token is left unchanged and
 * the user is warned. Each per-variant outcome is a rename (`to`), a removal, or
 * `keep` (unchanged for that variant).
 */
export interface VariantDependentVariable {
  /** outcome when `variant="toggle"` (renders ToggleFacade -> `Toggle` slot) */
  toggle: RenamedVariable | RemovedVariable | KeptVariable
  /** outcome for the default/`variant="simple"` checkbox (CheckboxFacade -> `Checkbox` slot) */
  simple: RenamedVariable | RemovedVariable | KeptVariable
}

export interface ComponentMapping {
  /** the package the component is imported from */
  import: string
  /** old theme variable name -> { new name, optional note } */
  renamed?: Record<string, RenamedVariable>
  /** old theme variable name -> { optional note } */
  removed?: Record<string, RemovedVariable>
  /** theme variable name -> { note } for tokens kept as-is but warned about */
  warned?: Record<string, WarnedVariable>
  /**
   * old theme variable name -> per-variant outcome, for tokens that migrate
   * differently depending on a component prop (currently only Checkbox's
   * `variant`). Only applied to per-instance `themeOverride` props, where the
   * variant can be read from the element.
   */
  variantDependent?: Record<string, VariantDependentVariable>
}

/**
 * The source-of-truth table of component theme variable changes, keyed by
 * component name. Built component-by-component from the upgrade guide and the
 * v1/v2 `theme.ts` diffs (`renamed` for value-preserving name changes,
 * `removed` for tokens with no 1:1 successor).
 */
export const THEME_VARIABLE_MAPPINGS: Record<string, ComponentMapping> = {
  Alert: {
    import: '@instructure/ui-alerts',
    removed: {
      boxShadow: {
        warning:
          '`boxShadow` has been removed; it now uses the `sharedTokens.boxShadow.elevation4` shared token.'
      },
      contentPadding: {
        warning:
          '`contentPadding` has been removed; use `contentPaddingVertical` and `contentPaddingHorizontal` instead.'
      }
    }
  },
  Avatar: {
    import: '@instructure/ui-avatar',
    renamed: {
      background: { to: 'backgroundColor' },
      borderWidthSmall: { to: 'borderWidthSm' },
      borderWidthMedium: { to: 'borderWidthMd' }
    },
    removed: {
      boxShadowColor: {
        warning:
          '`boxShadowColor`/`boxShadowBlur` were removed; `boxShadow` is now a single object token.'
      },
      boxShadowBlur: {
        warning:
          '`boxShadowColor`/`boxShadowBlur` were removed; `boxShadow` is now a single object token.'
      },
      color: {
        warning:
          "Avatar's color system was reworked to `accent1`-`accent6`; use `blueBackgroundColor`/`blueTextColor` instead of `color`."
      },
      colorShamrock: {
        warning:
          "Avatar's color system was reworked to `accent1`-`accent6`; use `greenBackgroundColor`/`greenTextColor` instead of `colorShamrock`."
      },
      colorBarney: {
        warning:
          "Avatar's color system was reworked to `accent1`-`accent6`; use `blueBackgroundColor`/`blueTextColor` instead of `colorBarney`."
      },
      colorCrimson: {
        warning:
          "Avatar's color system was reworked to `accent1`-`accent6`; use `redBackgroundColor`/`redTextColor` instead of `colorCrimson`."
      },
      colorFire: {
        warning:
          "Avatar's color system was reworked to `accent1`-`accent6`; use `orangeBackgroundColor`/`orangeTextColor` instead of `colorFire`."
      },
      colorLicorice: {
        warning:
          "Avatar's color system was reworked to `accent1`-`accent6`; use `ashBackgroundColor`/`ashTextColor` instead of `colorLicorice`."
      },
      colorAsh: {
        warning:
          "Avatar's color system was reworked to `accent1`-`accent6`; use `greyBackgroundColor`/`greyTextColor` instead of `colorAsh`."
      },
      aiFontColor: {
        warning: 'the AI variant text now uses `textOnColor`.'
      }
    }
  },
  Billboard: {
    import: '@instructure/ui-billboard',
    removed: {
      iconColor: {},
      iconHoverColor: {}
    }
  },
  Spinner: {
    import: '@instructure/ui-spinner',
    renamed: {
      xSmallBorderWidth: { to: 'strokeWidthXs' },
      smallBorderWidth: { to: 'strokeWidthSm' },
      mediumBorderWidth: { to: 'strokeWidthMd' },
      largeBorderWidth: { to: 'strokeWidthLg' }
    },
    removed: {
      xSmallSize: {
        warning:
          '`xSmallSize` has been removed; use `containerSizeXs` (outer container) and `spinnerSizeXs` (the circle).'
      },
      smallSize: {
        warning:
          '`smallSize` has been removed; use `containerSizeSm` (outer container) and `spinnerSizeSm` (the circle).'
      },
      mediumSize: {
        warning:
          '`mediumSize` has been removed; use `containerSizeMd` (outer container) and `spinnerSizeMd` (the circle).'
      },
      largeSize: {
        warning:
          '`largeSize` has been removed; use `containerSizeLg` (outer container) and `spinnerSizeLg` (the circle).'
      }
    }
  },
  Metric: {
    import: '@instructure/ui-metric',
    removed: {
      padding: {
        warning:
          '`padding` has been removed. Use `paddingHorizontal` for left/right padding'
      },
      fontFamily: {
        warning:
          '`fontFamily` has been removed. Use `valueFontFamily` and `labelFontFamily` for setting the value and label font families'
      }
    }
  },
  MetricGroup: {
    import: '@instructure/ui-metric',
    removed: {
      lineHeight: {}
    }
  },
  Modal: {
    import: '@instructure/ui-modal',
    renamed: {
      background: { to: 'backgroundColor' },
      inverseBackground: { to: 'inverseBackgroundColor' }
    },
    warned: {
      boxShadow: {
        warning:
          '`boxShadow` is now an object (`{ 0: {…}, 1: {…} }`) instead of a CSS string; update any string override.'
      }
    }
  },
  'Modal.Body': {
    import: '@instructure/ui-modal',
    renamed: {
      inverseBackground: { to: 'inverseBackgroundColor' }
    }
  },
  'Modal.Header': {
    import: '@instructure/ui-modal',
    renamed: {
      background: { to: 'backgroundColor' },
      inverseBackground: { to: 'inverseBackgroundColor' }
    }
  },
  'Modal.Footer': {
    import: '@instructure/ui-modal',
    renamed: {
      background: { to: 'backgroundColor' },
      inverseBackground: { to: 'inverseBackgroundColor' }
    }
  },
  NumberInput: {
    import: '@instructure/ui-number-input',
    renamed: {
      color: { to: 'textColor' },
      background: { to: 'backgroundColor' },
      arrowsHoverBackgroundColor: { to: 'arrowsBackgroundHoverColor' },
      mediumFontSize: { to: 'fontSizeMd' },
      largeFontSize: { to: 'fontSizeLg' },
      mediumHeight: { to: 'heightMd' },
      largeHeight: { to: 'heightLg' }
    },
    removed: {
      padding: {
        warning:
          '`padding` has been removed. Use `paddingHorizontalMd` and `paddingHorizontalLg` for horizontal padding'
      },
      arrowsActiveBoxShadow: {
        warning:
          '`arrowsActiveBoxShadow` has been removed; the arrow `:active` state now uses `arrowsBackgroundActiveColor` and `arrowsBorderActiveColor`'
      },
      borderStyle: {},
      arrowsColor: {},
      requiredInvalidColor: {},
      errorOutlineColor: {},
      focusOutlineWidth: {},
      focusOutlineStyle: {},
      focusOutlineColor: {}
    }
  },
  Heading: {
    import: '@instructure/ui-heading',
    renamed: {
      primaryColor: { to: 'baseColor' },
      secondaryColor: { to: 'mutedColor' },
      primaryInverseColor: { to: 'inverseColor' },
      secondaryInverseColor: { to: 'inverseColor' }
    },
    removed: {
      weightImportant: {},
      lineHeight125: {},
      lineHeight150: {}
    },
    warned: {
      titlePageDesktop: {
        warning:
          '`titlePageDesktop` is now a full typography object instead of just a font size; update any override.'
      },
      titlePageMobile: {
        warning:
          '`titlePageMobile` is now a full typography object instead of just a font size; update any override.'
      },
      titleSection: {
        warning:
          '`titleSection` is now a full typography object instead of just a font size; update any override.'
      },
      titleCardSection: {
        warning:
          '`titleCardSection` is now a full typography object instead of just a font size; update any override.'
      },
      titleModule: {
        warning:
          '`titleModule` is now a full typography object instead of just a font size; update any override.'
      },
      titleCardLarge: {
        warning:
          '`titleCardLarge` is now a full typography object instead of just a font size; update any override.'
      },
      titleCardRegular: {
        warning:
          '`titleCardRegular` is now a full typography object instead of just a font size; update any override.'
      },
      titleCardMini: {
        warning:
          '`titleCardMini` is now a full typography object instead of just a font size; update any override.'
      },
      label: {
        warning:
          '`label` is now a full typography object instead of just a font size; update any override.'
      },
      labelInline: {
        warning:
          '`labelInline` is now a full typography object instead of just a font size; update any override.'
      }
    }
  },
  Tag: {
    import: '@instructure/ui-tag',
    removed: {
      defaultIconColor: {},
      defaultIconHoverColor: {},
      focusOutlineColor: {},
      focusOutlineStyle: {},
      focusOutlineWidth: {},
      padding: {
        warning:
          'paddingHorizontal replaces padding for horizontal padding control'
      },
      paddingSmall: {
        warning:
          'paddingHorizontalSmall replaces paddingSmall for horizontal padding control'
      }
    }
  },
  Pill: {
    import: '@instructure/ui-pill',
    renamed: {
      padding: {
        to: 'paddingHorizontal',
        warning: 'now only controls horizontal padding'
      },
      background: { to: 'backgroundColor' }
    },
    removed: {
      primaryColor: {
        warning: 'split into baseTextColor and baseBorderColor'
      },
      successColor: {
        warning: 'split into successTextColor and successBorderColor'
      },
      infoColor: { warning: 'split into infoTextColor and infoBorderColor' },
      warningColor: {
        warning: 'split into warningTextColor and warningBorderColor'
      },
      dangerColor: {
        warning: 'replaced with errorTextColor and errorBorderColor'
      },
      alertColor: { warning: 'use info* variables instead' }
    }
  },
  Text: {
    import: '@instructure/ui-text',
    renamed: {
      primaryColor: { to: 'baseColor' },
      secondaryColor: { to: 'mutedColor' },
      primaryInverseColor: { to: 'inverseColor' },
      secondaryInverseColor: { to: 'inverseColor' },
      brandColor: { to: 'primaryColor' },
      dangerColor: { to: 'errorColor' },
      weightImportant: { to: 'fontWeightImportant' },
      weightRegular: { to: 'fontWeightRegular' }
    },
    removed: {
      alertColor: {}
    }
  },
  TextArea: {
    import: '@instructure/ui-text-area',
    renamed: {
      smallFontSize: { to: 'fontSizeSm' },
      mediumFontSize: { to: 'fontSizeMd' },
      largeFontSize: { to: 'fontSizeLg' },
      color: { to: 'textColor' },
      background: { to: 'backgroundColor' }
    },
    removed: {
      requiredInvalidColor: {},
      borderStyle: {},
      borderTopColor: {},
      borderRightColor: {},
      borderBottomColor: {},
      borderLeftColor: {},
      focusOutlineColor: {},
      focusOutlineWidth: {},
      focusOutlineStyle: {}
    }
  },
  TextInput: {
    import: '@instructure/ui-text-input',
    renamed: {
      smallFontSize: { to: 'fontSizeSm' },
      mediumFontSize: { to: 'fontSizeMd' },
      largeFontSize: { to: 'fontSizeLg' },
      smallHeight: { to: 'heightSm' },
      mediumHeight: { to: 'heightMd' },
      largeHeight: { to: 'heightLg' },
      color: { to: 'textColor' },
      background: { to: 'backgroundColor' }
    },
    removed: {
      padding: {},
      borderStyle: {},
      focusOutlineWidth: {},
      focusOutlineStyle: {},
      focusOutlineColor: {},
      requiredInvalidColor: {}
    }
  },
  'Rating.Icon': {
    import: '@instructure/ui-rating',
    removed: {
      smallIconFontSize: {},
      mediumIconFontSize: {},
      largeIconFontSize: {}
    }
  },
  RangeInput: {
    import: '@instructure/ui-range-input',
    renamed: {
      handleShadow: {
        to: 'boxShadow',
        warning:
          '`handleShadow` is now `boxShadow`, an object (`{ 0: {…}, 1: {…} }`) instead of a CSS string; update any string override.'
      }
    },
    removed: {
      handleFocusRingSize: {
        warning: 'style uses sharedTokens.focusOutline.width token'
      },
      handleFocusRingColor: {
        warning: 'style uses sharedTokens.focusOutline.onColor token'
      },
      handleFocusOutlineColor: {},
      handleFocusOutlineWidth: {},
      handleShadowColor: {}
    },
    warned: {
      valueSmallPadding: {
        warning: 'now only sets horizontal padding of the value'
      },
      valueMediumPadding: {
        warning: 'now only sets horizontal padding of the value'
      },
      valueLargePadding: {
        warning: 'now only sets horizontal padding of the value'
      }
    }
  },
  RadioInput: {
    import: '@instructure/ui-radio-input',
    renamed: {
      background: { to: 'backgroundColor' },
      hoverBorderColor: { to: 'borderHoverColor' },
      labelColor: { to: 'labelBaseColor' },
      labelFontFamily: { to: 'fontFamily' },
      labelFontWeight: { to: 'fontWeight' },
      simpleFacadeMarginEnd: { to: 'gap' },
      simpleFacadeSmallSize: { to: 'controlSizeSm' },
      simpleFacadeMediumSize: { to: 'controlSizeMd' },
      simpleFacadeLargeSize: { to: 'controlSizeLg' },
      simpleCheckedInsetSmall: { to: 'checkedInsetSm' },
      simpleCheckedInsetMedium: { to: 'checkedInsetMd' },
      simpleCheckedInsetLarge: { to: 'checkedInsetLg' },
      simpleFontSizeSmall: { to: 'fontSizeSm' },
      simpleFontSizeMedium: { to: 'fontSizeMd' },
      simpleFontSizeLarge: { to: 'fontSizeLg' }
    },
    removed: {
      focusBorderColor: {
        warning: 'focus outline is now controlled via sharedTokens'
      },
      focusBorderWidth: {
        warning: 'focus outline is now controlled via sharedTokens'
      },
      focusBorderStyle: {
        warning: 'focus outline is now controlled via sharedTokens'
      },
      labelLineHeight: {
        warning:
          'split into size-specific lineHeightSm, lineHeightMd, lineHeightLg'
      }
    },
    warned: {
      toggleShadow: {
        warning:
          '`toggleShadow` is now an object (`{ 0: {…}, 1: {…} }`) instead of a CSS string; update any string override.'
      }
    }
  },
  RadioInputGroup: {
    import: '@instructure/ui-radio-input',
    removed: {
      invalidAsteriskColor: {}
    }
  },
  Link: {
    import: '@instructure/ui-link',
    renamed: {
      color: { to: 'textColor' },
      hoverColor: { to: 'textHoverColor' },
      colorInverse: { to: 'onColorTextColor' }
    },
    removed: {
      fontSize: {},
      fontSizeSmall: {},
      lineHeight: {},
      focusOutlineWidth: {},
      focusOutlineStyle: {},
      focusOutlineColor: {},
      focusOutlineBorderRadius: {},
      focusInverseOutlineColor: {},
      focusInverseIconOutlineColor: {},
      iconSize: {},
      iconPlusTextMargin: {},
      iconPlusTextMarginSmall: {},
      textUnderlineOffset: {},
      hoverTextDecorationWithinText: {},
      hoverTextDecorationOutsideText: {},
      textDecorationWithinText: {},
      textDecorationOutsideText: {}
    }
  },
  View: {
    import: '@instructure/ui-view',
    removed: {
      marginXxxSmall: { warning: 'Use sharedTokens.spacing' },
      marginXxSmall: { warning: 'Use sharedTokens.spacing' },
      marginXSmall: { warning: 'Use sharedTokens.spacing' },
      marginSmall: { warning: 'Use sharedTokens.spacing' },
      marginMedium: { warning: 'Use sharedTokens.spacing' },
      marginLarge: { warning: 'Use sharedTokens.spacing' },
      marginXLarge: { warning: 'Use sharedTokens.spacing' },
      marginXxLarge: { warning: 'Use sharedTokens.spacing' },
      paddingXxxSmall: { warning: 'Use sharedTokens.spacing' },
      paddingXxSmall: { warning: 'Use sharedTokens.spacing' },
      paddingXSmall: { warning: 'Use sharedTokens.spacing' },
      paddingSmall: { warning: 'Use sharedTokens.spacing' },
      paddingMedium: { warning: 'Use sharedTokens.spacing' },
      paddingLarge: { warning: 'Use sharedTokens.spacing' },
      paddingXLarge: { warning: 'Use sharedTokens.spacing' },
      paddingXxLarge: { warning: 'Use sharedTokens.spacing' },
      shadowResting: { warning: 'Use sharedTokens.boxShadow.elevation*' },
      shadowAbove: { warning: 'Use sharedTokens.boxShadow.elevation*' },
      shadowTopmost: { warning: 'Use sharedTokens.boxShadow.elevation*' },
      borderRadiusSmall: { warning: 'Use sharedTokens.radius*' },
      borderRadiusMedium: { warning: 'Use sharedTokens.radius*' },
      borderRadiusLarge: { warning: 'Use sharedTokens.radius*' },
      borderWidthSmall: { warning: 'Use sharedTokens.width*' },
      borderWidthMedium: { warning: 'Use sharedTokens.width*' },
      borderWidthLarge: { warning: 'Use sharedTokens.width*' },
      focusOutlineStyle: {
        warning: 'focus outline is now controlled via sharedTokens.focusOutline'
      },
      focusOutlineWidth: {
        warning: 'focus outline is now controlled via sharedTokens.focusOutline'
      },
      focusOutlineOffset: {
        warning: 'focus outline is now controlled via sharedTokens.focusOutline'
      },
      focusOutlineInset: {
        warning: 'focus outline is now controlled via sharedTokens.focusOutline'
      },
      focusColorInfo: {
        warning: 'focus outline is now controlled via sharedTokens.focusOutline'
      },
      focusColorDanger: {
        warning: 'focus outline is now controlled via sharedTokens.focusOutline'
      },
      focusColorSuccess: {
        warning: 'focus outline is now controlled via sharedTokens.focusOutline'
      },
      focusColorInverse: {
        warning: 'focus outline is now controlled via sharedTokens.focusOutline'
      }
    }
  },
  Tray: {
    import: '@instructure/ui-tray',
    renamed: {
      background: { to: 'backgroundColor' },
      xSmallWidth: { to: 'widthXs' },
      smallWidth: { to: 'widthSm' },
      regularWidth: { to: 'widthMd' },
      mediumWidth: { to: 'widthLg' },
      largeWidth: { to: 'widthXl' }
    },
    removed: {
      borderStyle: {},
      position: {}
    },
    warned: {
      boxShadow: {
        warning:
          '`boxShadow` is now an object (`{ 0: {…}, 1: {…} }`) instead of a CSS string; update any string override.'
      }
    }
  },
  ToggleDetails: {
    import: '@instructure/ui-toggle-details',
    renamed: {
      smallIconSize: {
        to: 'contentPaddingSmall',
        warning:
          '`smallIconSize` is now `contentPaddingSmall` and only controls the content padding; the icon is now self-sized.'
      },
      mediumIconSize: {
        to: 'contentPaddingMedium',
        warning:
          '`mediumIconSize` is now `contentPaddingMedium` and only controls the content padding; the icon is now self-sized.'
      },
      largeIconSize: {
        to: 'contentPaddingLarge',
        warning:
          '`largeIconSize` is now `contentPaddingLarge` and only controls the content padding; the icon is now self-sized.'
      }
    },
    removed: {
      toggleFocusBorderColor: {}
    }
  },
  Breadcrumb: {
    import: '@instructure/ui-breadcrumb',
    removed: {
      fontFamily: { warning: 'handled in Link component' },
      separatorColor: { warning: 'handled in Link component' },
      smallSeparatorFontSize: { warning: 'handled in Link component' },
      smallFontSize: { warning: 'handled in Link component' },
      mediumSeparatorFontSize: { warning: 'handled in Link component' },
      mediumFontSize: { warning: 'handled in Link component' },
      largeSeparatorFontSize: { warning: 'handled in Link component' },
      largeFontSize: { warning: 'handled in Link component' }
    }
  },
  // Checkbox renders either CheckboxFacade (default / `variant="simple"`, reads
  // the `Checkbox` token slot) or ToggleFacade (`variant="toggle"`, reads the
  // `Toggle` slot) and forwards its `themeOverride` to whichever one renders.
  // `renamed`/`removed` below are non-variant-dependent: either shared by both
  // facades with the same v2 fate, or used by only one facade (so a `themeOverride`
  // setting them implies that variant). Tokens that migrate *differently* per
  // variant are in `variantDependent` and resolved from the element's `variant`.
  Checkbox: {
    import: '@instructure/ui-checkbox',
    renamed: {
      background: { to: 'backgroundColor' },
      checkedBorderColor: { to: 'borderCheckedColor' },
      hoverBorderColor: { to: 'borderHoverColor' },
      marginRight: { to: 'gap' },
      facadeSizeSmall: { to: 'controlSizeSm' },
      facadeSizeMedium: { to: 'controlSizeMd' },
      facadeSizeLarge: { to: 'controlSizeLg' },
      // Checkbox wrapper token (applies to both variants)
      requiredInvalidColor: { to: 'asteriskColor' }
    },
    removed: {
      // notes mirror the Checkbox upgrade-guide tables (empty -> silent)
      color: {},
      focusBorderStyle: {},
      focusBorderWidth: {},
      focusBorderColor: {},
      padding: {},
      checkedLabelColor: {},
      // CheckboxFacade-only: in v2 the icon fontSize collapses into the shared
      // fontSize* tokens that labelFontSize* already maps to, so removed (per guide).
      iconSizeSmall: {},
      iconSizeMedium: {},
      iconSizeLarge: {},
      // ToggleFacade-only
      focusOutlineColor: {},
      checkedIconColor: {},
      uncheckedIconColor: {},
      // Checkbox wrapper tokens
      checkErrorInsetWidth: { warning: 'split into new size variants' },
      toggleErrorInsetWidth: { warning: 'custom calculation added' }
    },
    variantDependent: {
      checkedBackground: {
        simple: { to: 'backgroundCheckedColor' },
        toggle: { to: 'checkedBackgroundColor' }
      },
      labelLineHeight: {
        simple: { to: 'lineHeight' },
        toggle: { warning: 'split into new size variants' }
      },
      labelFontSizeSmall: {
        simple: { to: 'fontSizeSm' },
        toggle: { to: 'labelFontSizeSm' }
      },
      labelFontSizeMedium: {
        simple: { to: 'fontSizeMd' },
        toggle: { to: 'labelFontSizeMd' }
      },
      labelFontSizeLarge: {
        simple: { to: 'fontSizeLg' },
        toggle: { to: 'labelFontSizeLg' }
      },
      // Renamed for the checkbox facade, kept unchanged for the toggle facade
      // (ToggleFacade v2 still uses labelColor/labelFontFamily/labelFontWeight).
      labelColor: {
        simple: { to: 'labelBaseColor' },
        toggle: { keep: true }
      },
      labelFontFamily: {
        simple: { to: 'fontFamily' },
        toggle: { keep: true }
      },
      labelFontWeight: {
        simple: { to: 'fontWeight' },
        toggle: { keep: true }
      }
    }
  },
  // Provider-override facades. In v1 the checkbox/toggle visuals were themed via
  // `componentOverrides.CheckboxFacade` / `.ToggleFacade`; in v2 those facades read
  // their own `CheckboxFacade` / `ToggleFacade` slots, so the overrides keep their
  // key and only the visual tokens rename. These mirror the guide's
  // "Checkbox (simple variant)" / "(toggle variant)" tables. (There are no
  // `<CheckboxFacade>`/`<ToggleFacade>` JSX elements in user code; these entries
  // only apply to provider `componentOverrides`.)
  CheckboxFacade: {
    import: '@instructure/ui-checkbox',
    renamed: {
      background: { to: 'backgroundColor' },
      checkedBackground: { to: 'backgroundCheckedColor' },
      checkedBorderColor: { to: 'borderCheckedColor' },
      hoverBorderColor: { to: 'borderHoverColor' },
      marginRight: { to: 'gap' },
      facadeSizeSmall: { to: 'controlSizeSm' },
      facadeSizeMedium: { to: 'controlSizeMd' },
      facadeSizeLarge: { to: 'controlSizeLg' },
      labelFontSizeSmall: { to: 'fontSizeSm' },
      labelFontSizeMedium: { to: 'fontSizeMd' },
      labelFontSizeLarge: { to: 'fontSizeLg' },
      labelColor: { to: 'labelBaseColor' },
      labelFontFamily: { to: 'fontFamily' },
      labelFontWeight: { to: 'fontWeight' },
      labelLineHeight: { to: 'lineHeight' }
    },
    removed: {
      color: {},
      padding: {},
      checkedLabelColor: {},
      iconSizeSmall: {},
      iconSizeMedium: {},
      iconSizeLarge: {},
      focusBorderStyle: {},
      focusBorderWidth: {},
      focusBorderColor: {}
    }
  },
  ToggleFacade: {
    import: '@instructure/ui-checkbox',
    renamed: {
      background: { to: 'backgroundColor' },
      checkedBackground: { to: 'checkedBackgroundColor' },
      labelFontSizeSmall: { to: 'labelFontSizeSm' },
      labelFontSizeMedium: { to: 'labelFontSizeMd' },
      labelFontSizeLarge: { to: 'labelFontSizeLg' }
    },
    removed: {
      color: {},
      checkedIconColor: {},
      uncheckedIconColor: {},
      focusOutlineColor: {},
      focusBorderWidth: {},
      focusBorderStyle: {},
      labelLineHeight: { warning: 'split into new size variants' }
    }
  },
  CloseButton: {
    import: '@instructure/ui-buttons',
    removed: {
      offsetMedium: { warning: 'now uses sharedTokens.spacing' },
      offsetSmall: { warning: 'now uses sharedTokens.spacing' },
      offsetXSmall: { warning: 'now uses sharedTokens.spacing' },
      zIndex: { warning: 'hardcoded to 1' }
    }
  },
  BaseButton: {
    import: '@instructure/ui-buttons',
    removed: {
      smallPaddingTop: { warning: 'replaced by paddingVertical' },
      smallPaddingBottom: { warning: 'replaced by paddingVertical' },
      mediumPaddingTop: { warning: 'replaced by paddingVertical' },
      mediumPaddingBottom: { warning: 'replaced by paddingVertical' },
      largePaddingTop: { warning: 'replaced by paddingVertical' },
      largePaddingBottom: { warning: 'replaced by paddingVertical' },
      iconSizeSmall: { warning: 'icon sizing handled by Lucide icon system' },
      iconSizeMedium: { warning: 'icon sizing handled by Lucide icon system' },
      iconSizeLarge: { warning: 'icon sizing handled by Lucide icon system' },
      iconTextGap: { warning: 'replaced by gapButtonContentSm/Md/Lg' },
      iconTextGapCondensed: { warning: 'replaced by gapButtonContentSm' },
      primaryActiveBoxShadow: {},
      primaryGhostActiveBoxShadow: {},
      secondaryActiveBoxShadow: {},
      secondaryGhostActiveBoxShadow: {},
      successActiveBoxShadow: {},
      successGhostActiveBoxShadow: {},
      dangerActiveBoxShadow: {},
      dangerGhostActiveBoxShadow: {},
      primaryInverseActiveBoxShadow: {},
      primaryInverseGhostActiveBoxShadow: {}
    }
  },
  CondensedButton: {
    // Uses BaseButton's token set; in v2 it reads its own `CondensedButton` slot,
    // so a provider `componentOverrides.CondensedButton` maps straight to
    // `themeOverride.components.CondensedButton` (no re-key).
    import: '@instructure/ui-buttons',
    removed: {
      smallPaddingTop: { warning: 'replaced by paddingVertical' },
      smallPaddingBottom: { warning: 'replaced by paddingVertical' },
      mediumPaddingTop: { warning: 'replaced by paddingVertical' },
      mediumPaddingBottom: { warning: 'replaced by paddingVertical' },
      largePaddingTop: { warning: 'replaced by paddingVertical' },
      largePaddingBottom: { warning: 'replaced by paddingVertical' },
      iconSizeSmall: { warning: 'icon sizing handled by Lucide icon system' },
      iconSizeMedium: { warning: 'icon sizing handled by Lucide icon system' },
      iconSizeLarge: { warning: 'icon sizing handled by Lucide icon system' },
      iconTextGap: { warning: 'replaced by gapButtonContentSm/Md/Lg' },
      iconTextGapCondensed: { warning: 'replaced by gapButtonContentSm' },
      primaryActiveBoxShadow: {},
      primaryGhostActiveBoxShadow: {},
      secondaryActiveBoxShadow: {},
      secondaryGhostActiveBoxShadow: {},
      successActiveBoxShadow: {},
      successGhostActiveBoxShadow: {},
      dangerActiveBoxShadow: {},
      dangerGhostActiveBoxShadow: {},
      primaryInverseActiveBoxShadow: {},
      primaryInverseGhostActiveBoxShadow: {}
    }
  },
  Button: {
    // Uses BaseButton's token set; in v2 it reads its own `Button` slot, so a
    // provider `componentOverrides.Button` maps straight to
    // `themeOverride.components.Button` (no re-key).
    import: '@instructure/ui-buttons',
    removed: {
      smallPaddingTop: { warning: 'replaced by paddingVertical' },
      smallPaddingBottom: { warning: 'replaced by paddingVertical' },
      mediumPaddingTop: { warning: 'replaced by paddingVertical' },
      mediumPaddingBottom: { warning: 'replaced by paddingVertical' },
      largePaddingTop: { warning: 'replaced by paddingVertical' },
      largePaddingBottom: { warning: 'replaced by paddingVertical' },
      iconSizeSmall: { warning: 'icon sizing handled by Lucide icon system' },
      iconSizeMedium: { warning: 'icon sizing handled by Lucide icon system' },
      iconSizeLarge: { warning: 'icon sizing handled by Lucide icon system' },
      iconTextGap: { warning: 'replaced by gapButtonContentSm/Md/Lg' },
      iconTextGapCondensed: { warning: 'replaced by gapButtonContentSm' },
      primaryActiveBoxShadow: {},
      primaryGhostActiveBoxShadow: {},
      secondaryActiveBoxShadow: {},
      secondaryGhostActiveBoxShadow: {},
      successActiveBoxShadow: {},
      successGhostActiveBoxShadow: {},
      dangerActiveBoxShadow: {},
      dangerGhostActiveBoxShadow: {},
      primaryInverseActiveBoxShadow: {},
      primaryInverseGhostActiveBoxShadow: {}
    }
  },
  IconButton: {
    // Uses BaseButton's token set; in v2 it reads its own `IconButton` slot, so a
    // provider `componentOverrides.IconButton` maps straight to
    // `themeOverride.components.IconButton` (no re-key).
    import: '@instructure/ui-buttons',
    removed: {
      smallPaddingTop: { warning: 'replaced by paddingVertical' },
      smallPaddingBottom: { warning: 'replaced by paddingVertical' },
      mediumPaddingTop: { warning: 'replaced by paddingVertical' },
      mediumPaddingBottom: { warning: 'replaced by paddingVertical' },
      largePaddingTop: { warning: 'replaced by paddingVertical' },
      largePaddingBottom: { warning: 'replaced by paddingVertical' },
      iconSizeSmall: { warning: 'icon sizing handled by Lucide icon system' },
      iconSizeMedium: { warning: 'icon sizing handled by Lucide icon system' },
      iconSizeLarge: { warning: 'icon sizing handled by Lucide icon system' },
      iconTextGap: { warning: 'replaced by gapButtonContentSm/Md/Lg' },
      iconTextGapCondensed: { warning: 'replaced by gapButtonContentSm' },
      primaryActiveBoxShadow: {},
      primaryGhostActiveBoxShadow: {},
      secondaryActiveBoxShadow: {},
      secondaryGhostActiveBoxShadow: {},
      successActiveBoxShadow: {},
      successGhostActiveBoxShadow: {},
      dangerActiveBoxShadow: {},
      dangerGhostActiveBoxShadow: {},
      primaryInverseActiveBoxShadow: {},
      primaryInverseGhostActiveBoxShadow: {}
    }
  },
  'Table.Cell': {
    import: '@instructure/ui-table',
    removed: {
      padding: {
        warning: 'split into paddingVertical and paddingHorizontal'
      }
    }
  },
  'Table.ColHeader': {
    import: '@instructure/ui-table',
    removed: {
      padding: {
        warning: 'split into paddingVertical and paddingHorizontal'
      },
      focusOutlineColor: {},
      focusOutlineStyle: {},
      focusOutlineWidth: {},
      sortedIconColor: {},
      unSortedIconColor: {}
    }
  },
  'Table.Row': {
    import: '@instructure/ui-table',
    removed: {
      padding: {
        warning: 'split into paddingVertical and paddingHorizontal'
      }
    }
  },
  'Table.RowHeader': {
    import: '@instructure/ui-table',
    removed: {
      padding: {
        warning: 'split into paddingVertical and paddingHorizontal'
      }
    }
  },
  'Tabs.Panel': {
    import: '@instructure/ui-tabs',
    renamed: {
      color: { to: 'textColor' }
    },
    removed: {
      focusOutlineColor: {
        warning: 'style uses sharedTokens.focusOutline.infoColor'
      },
      borderStyle: {}
    }
  },
  'Tabs.Tab': {
    import: '@instructure/ui-tabs',
    renamed: {
      defaultColor: { to: 'defaultTextColor' },
      secondaryColor: { to: 'secondaryTextColor' }
    }
  },
  Mask: {
    import: '@instructure/ui-overlays',
    renamed: {
      background: { to: 'backgroundColor' }
    },
    removed: {
      zIndex: {},
      borderColor: {},
      focusBorderColor: {},
      borderRadius: {},
      borderWidth: {}
    }
  },
  Menu: {
    import: '@instructure/ui-menu',
    removed: {
      focusBorderStyle: { warning: 'style uses sharedTokens.focusOutline' },
      focusBorderWidth: { warning: 'style uses sharedTokens.focusOutline' },
      focusBorderColor: { warning: 'style uses sharedTokens.focusOutline' },
      focusBorderRadius: { warning: 'style uses sharedTokens.focusOutline' },
      background: {},
      borderRadius: {}
    }
  },
  'Menu.Item': {
    import: '@instructure/ui-menu',
    removed: {
      iconColor: {},
      activeIconColor: {},
      padding: {
        warning: 'split into paddingVertical and paddingHorizontal'
      }
    }
  },
  'Menu.Group': {
    import: '@instructure/ui-menu',
    removed: {
      padding: {
        warning: 'split into paddingVertical and paddingHorizontal'
      }
    }
  },
  'Menu.Separator': {
    import: '@instructure/ui-menu',
    removed: {
      margin: {
        warning: 'split into marginVertical and marginHorizontal'
      }
    }
  },
  'SideNavBar.Item': {
    import: '@instructure/ui-side-nav-bar',
    renamed: {
      innerFocusOutline: { to: 'innerFocusOutlineColor' },
      outerFocusOutline: { to: 'outerFocusOutlineColor' },
      selectedInnerFocusOutline: { to: 'selectedInnerFocusOutlineColor' },
      selectedOuterFocusOutline: { to: 'selectedOuterFocusOutlineColor' }
    },
    removed: {
      iconColor: {},
      iconSize: {},
      selectedIconColor: {}
    }
  },
  Options: {
    import: '@instructure/ui-options',
    removed: {
      nestedLabelPadding: {
        warning:
          'split into nestedLabelPaddingVertical and nestedLabelPaddingHorizontal'
      }
    }
  },
  'Options.Item': {
    import: '@instructure/ui-options',
    removed: {
      padding: {
        warning: 'split into paddingVertical and paddingHorizontal'
      }
    }
  },
  'Options.Separator': {
    import: '@instructure/ui-options',
    removed: {
      margin: {
        warning: 'split into marginVertical and marginHorizontal'
      }
    }
  },
  // Drilldown itself has no token changes, but its sub-components forward their
  // `themeOverride` to the Options components they render, so the Options token
  // changes apply to a `themeOverride` set on Drilldown.Group/Option/Separator.
  'Drilldown.Group': {
    import: '@instructure/ui-drilldown',
    removed: {
      nestedLabelPadding: {
        warning:
          'split into nestedLabelPaddingVertical and nestedLabelPaddingHorizontal'
      }
    }
  },
  'Drilldown.Option': {
    import: '@instructure/ui-drilldown',
    removed: {
      padding: {
        warning: 'split into paddingVertical and paddingHorizontal'
      }
    }
  },
  'Drilldown.Separator': {
    import: '@instructure/ui-drilldown',
    removed: {
      margin: {
        warning: 'split into marginVertical and marginHorizontal'
      }
    }
  },
  Grid: {
    import: '@instructure/ui-grid',
    removed: {
      mediumMin: {
        warning: 'value is read from `sharedTokens.breakpoints.md`'
      },
      largeMin: {
        warning:
          'value is read from `sharedTokens.breakpoints.lg`. Its value is now 64em instead of 62em.'
      },
      xLargeMin: {
        warning:
          'value is read from `sharedTokens.breakpoints.xl`. Its value is now 80em instead of 75em.'
      }
    }
  },
  'Grid.Col': {
    import: '@instructure/ui-grid',
    removed: {
      mediumMin: {
        warning: 'value is read from `sharedTokens.breakpoints.md`'
      },
      largeMin: {
        warning: 'value is read from `sharedTokens.breakpoints.lg`'
      },
      xLargeMin: {
        warning: 'value is read from `sharedTokens.breakpoints.xl`'
      }
    }
  },
  'Grid.Row': {
    import: '@instructure/ui-grid',
    removed: {
      mediumMin: {
        warning: 'value is read from `sharedTokens.breakpoints.md`'
      },
      largeMin: {
        warning: 'value is read from `sharedTokens.breakpoints.lg`'
      },
      xLargeMin: {
        warning: 'value is read from `sharedTokens.breakpoints.xl`'
      }
    }
  },
  FormFieldGroup: {
    import: '@instructure/ui-form-field',
    removed: {
      errorBorderColor: {},
      errorFieldsPadding: {},
      borderColor: {},
      borderStyle: {},
      borderWidth: {},
      borderRadius: {}
    }
  },
  FormFieldLayout: {
    import: '@instructure/ui-form-field',
    renamed: {
      color: { to: 'textColor' }
    },
    removed: {
      spacing: {},
      inlinePadding: {},
      stackedOrInlineBreakpoint: {
        warning: 'now uses `sharedTokens.breakpoints.md`'
      }
    }
  },
  FormFieldMessage: {
    import: '@instructure/ui-form-field',
    renamed: {
      colorHint: { to: 'hintTextColor' },
      colorError: { to: 'errorTextColor' },
      colorSuccess: { to: 'successTextColor' }
    },
    removed: {
      errorIconMarginRight: {}
    }
  },
  FormFieldMessages: {
    import: '@instructure/ui-form-field',
    removed: {
      topMargin: {}
    }
  },
  ColorPicker: {
    import: '@instructure/ui-color-picker',
    removed: {
      warningIconColor: {},
      errorIconColor: {},
      successIconColor: {},
      spacing: { warning: 'now uses sharedTokens.spacing' }
    }
  },
  SourceCodeEditor: {
    import: '@instructure/ui-source-code-editor',
    removed: {
      focusBorderColor: {
        warning: 'now uses sharedTokens.focusOutline.infoColor'
      }
    }
  },
  NutritionFacts: {
    import: '@instructure/ui-instructure',
    renamed: {
      cardBorderRadius: { to: 'borderRadius' }
    }
  },
  Flex: {
    import: '@instructure/ui-flex',
    removed: {
      gapButtons: {},
      gapCheckboxes: {},
      gapDataPoints: {},
      gapInputFields: {},
      gapLarge: {},
      gapMedium: {},
      gapMediumSmall: {},
      gapModalElements: {},
      gapModuleElements: {},
      gapPaddingCardLarge: {},
      gapPaddingCardMedium: {},
      gapPaddingCardSmall: {},
      gapRadios: {},
      gapSectionElements: {},
      gapSections: {},
      gapSelects: {},
      gapSmall: {},
      gapSpace0: {},
      gapSpace12: {},
      gapSpace16: {},
      gapSpace2: {},
      gapSpace24: {},
      gapSpace36: {},
      gapSpace4: {},
      gapSpace48: {},
      gapSpace60: {},
      gapSpace8: {},
      gapStatusIndicators: {},
      gapTags: {},
      gapTextareas: {},
      gapToggles: {},
      gapTrayElements: {},
      gapXLarge: {},
      gapXSmall: {},
      gapXxLarge: {},
      gapXxSmall: {},
      gapXxxSmall: {}
    }
  },
  TreeBrowser: {
    import: '@instructure/ui-tree-browser',
    removed: {
      focusOutlineWidth: { warning: 'handled by sharedTokens' },
      focusOutlineStyle: { warning: 'handled by sharedTokens' },
      focusOutlineColor: { warning: 'handled by sharedTokens' }
    }
  },
  'TreeBrowser.Button': {
    import: '@instructure/ui-tree-browser',
    removed: {
      focusOutlineWidth: { warning: 'handled by sharedTokens' },
      focusOutlineStyle: { warning: 'handled by sharedTokens' },
      focusOutlineColor: { warning: 'handled by sharedTokens' },
      iconColor: {}
      // NB: `iconsMarginRight` and `selectedOutlineWidth` are dead-in-v1 (unused in
      // v1 styles) - kept in the upgrade guide as "unused token" but excluded here.
    }
  }
}

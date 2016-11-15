import { alpha, darken } from '../../util/color'

const activeShadow = 'inset 0 1px 0'
const focusShadow = 'inset 0 0 0 1px'
const focusOutline = '1px solid'

const buttonVariant = function (style, mainColor, textColor) {
  return {
    [style]: {
      background: mainColor,
      borderColor: darken(mainColor, 10),
      color: textColor,
      hover: {
        background: darken(mainColor, 10)
      },
      active: {
        boxShadow: `${activeShadow} ${darken(mainColor, 35)}`
      }
    }
  }
}

export default function generator ({ colors, borders, forms, spacing, typography }) {
  return {
    borderWidth: borders.widthSmall,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    borderRadius: borders.radiusMedium,
    borderStyle: borders.style,

    small: {
      height: forms.inputHeightSmall,
      padding: `0 ${spacing.xSmall}`,
      fontSize: typography.fontSizeXSmall
    },

    medium: {
      height: forms.inputHeightMedium,
      padding: `0 ${spacing.small}`,
      fontSize: typography.fontSizeSmall
    },

    large: {
      height: forms.inputHeightLarge,
      padding: `0 ${spacing.medium}`,
      fontSize: typography.fontSizeMedium
    },

    focus: {
      borderRadius: borders.radiusLarge,
      border: `${focusOutline} ${colors.brand}`
    },

    light: {
      background: colors.lightest,
      borderColor: darken(colors.light, 10),
      color: colors.dark,
      hover: {
        background: darken(colors.lightest, 5)
      },
      active: {
        boxShadow: `${activeShadow} ${darken(colors.lightest, 25)}`
      }
    },

    ghost: {
      background: 'transparent',
      borderColor: colors.brand,
      color: colors.brand,
      hover: {
        background: alpha(colors.brand, 10)
      },
      active: {
        boxShadow: `inset 0 3px 0 ${alpha(colors.brand, 20)}`
      },

      inverse: {
        background: 'transparent',
        borderColor: colors.lightest,
        color: colors.lightest,
        hover: {
          background: alpha(colors.lightest, 10)
        },
        active: {
          boxShadow: `inset 0 3px 0 ${alpha(colors.lightest, 20)}`
        },
        focus: {
          border: `${focusOutline} ${colors.lightest}`
        }
      }
    },

    link: {
      color: colors.brand,
      borderColor: 'transparent',
      hover: {
        color: darken(colors.brand, 10)
      },
      focus: {
        boxShadow: colors.brand
      }
    },

    icon: {
      borderColor: 'transparent',
      padding: `0 ${spacing.xSmall}`,
      color: colors.dark,
      hover: {
        color: colors.brand
      },
      focus: {
        boxShadow: `${focusShadow} ${colors.brand}`
      },

      inverse: {
        color: colors.lightest,
        hover: {
          color: colors.lightest
        },
        focus: {
          boxShadow: `${focusShadow} ${colors.lightest}`
        }
      }
    },

    ...buttonVariant(
      'default',
      colors.light,
      colors.dark
    ),

    ...buttonVariant(
      'primary',
      colors.brand,
      colors.lightest
    ),

    ...buttonVariant(
      'success',
      colors.success,
      colors.lightest
    ),

    ...buttonVariant(
      'circle-primary',
      colors.brand,
      colors.lightest
    ),

    ...buttonVariant(
      'circle-danger',
      colors.danger,
      colors.lightest
    )
  }
}

generator.canvas = function (variables) {
  return {
    focus: {
      border: `${focusOutline} ${variables['ic-brand-primary']}`
    },

    ghost: {
      borderColor: variables['ic-brand-button--primary-bgd'],
      color: variables['ic-brand-button--primary-bgd'],

      hover: {
        background: alpha(variables['ic-brand-button--primary-bgd'], 10)
      },

      active: {
        boxShadow: `inset 0 3px 0 ${alpha(variables['ic-brand-button--primary-bgd'], 20)}`
      }
    },

    link: {
      color: variables['ic-link-color'],

      hover: {
        color: darken(variables['ic-link-color'], 10)
      },

      focus: {
        boxShadow: variables['ic-link-color']
      }
    },

    icon: {
      hover: {
        color: variables['ic-brand-primary']
      },

      focus: {
        boxShadow: `${focusShadow} ${variables['ic-brand-primary']}`
      }
    },

    ...buttonVariant(
      'primary',
      variables['ic-brand-button--primary-bgd'],
      variables['ic-brand-button--primary-text']
    ),

    ...buttonVariant(
      'circle-primary',
      variables['ic-brand-button--primary-bgd'],
      variables['ic-brand-button--primary-text']
    )
  }
}

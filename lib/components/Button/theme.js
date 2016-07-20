import { darken } from '../../util/color'

const activeShadow = 'inset 0 1px 0'
const focusShadow = 'inset 0 0 0 1px'

const buttonVariant = function (style, mainColor, textColor, focusOutlineColor) {
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
      },
      focus: {
        boxShadow: `${focusShadow} ${focusOutlineColor}`
      }
    }
  }
}

export default function ({ colors }) {
  return {
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
      color: colors.dark,
      hover: {
        color: colors.brand
      },
      focus: {
        boxShadow: `${focusShadow} ${colors.brand}`
      }
    },

    'icon-inverse': {
      color: colors.lightest,
      hover: {
        color: colors.lightest
      },
      focus: {
        boxShadow: `${focusShadow} ${colors.lightest}`
      }
    },

    ...buttonVariant(
      'default',
      colors.light,
      colors.dark,
      colors.brand
    ),

    ...buttonVariant(
      'primary',
      colors.brand,
      colors.lightest,
      colors.lightest
    ),

    ...buttonVariant(
      'success',
      colors.success,
      colors.lightest,
      colors.lightest
    )
  }
}

export default function generator ({ typography, colors, spacing }) {
  return {
    ...typography,

    primary: {
      color: colors.darkest,

      inverse: {
        color: colors.lightest
      }
    },

    secondary: {
      color: colors.medium,

      inverse: {
        color: colors.light
      }
    },

    brand: {
      color: colors.brand
    },

    warning: {
      color: colors.warning
    },

    error: {
      color: colors.danger
    },

    success: {
      color: colors.success
    },

    paragraph: {
      margin: `${spacing.medium} 0`
    }
  }
}

generator.canvas = function (variables) {
  return {
    primary: {
      color: variables['ic-brand-font-color-dark']
    },
    brand: {
      color: variables['ic-brand-primary']
    }
  }
}

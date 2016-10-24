export default function ({ typography, colors, spacing }) {
  return {
    ...typography,

    primary: {
      color: colors.darkest,

      inverse: {
        color: colors.lightest
      }
    },

    secondary: {
      color: colors.dark,

      inverse: {
        color: colors.light
      }
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

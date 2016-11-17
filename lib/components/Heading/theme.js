export default function generator ({ borders, colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,

    h1: {
      fontSize: typography.fontSizeXXLarge,
      fontWeight: typography.fontWeightNormal
    },

    h2: {
      fontSize: typography.fontSizeXLarge,
      fontWeight: typography.fontWeightNormal
    },

    h3: {
      fontSize: typography.fontSizeLarge,
      fontWeight: typography.fontWeightNormal
    },

    h4: {
      fontSize: typography.fontSizeMedium,
      fontWeight: typography.fontWeightNormal
    },

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

    border: {
      padding: spacing.xxSmall,
      color: colors.border,
      width: borders.widthSmall,
      style: borders.style
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

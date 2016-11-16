export default function generator ({ colors, spacing, typography }) {
  return {
    icon: {
      margin: spacing.xxxSmall
    },
    iconEmpty: {
      color: colors.brand
    },
    iconFilled: {
      color: colors.brand
    },
    small: {
      icon: {
        fontSize: typography.fontSizeMedium
      }
    },
    medium: {
      icon: {
        fontSize: typography.fontSizeLarge
      }
    },
    large: {
      icon: {
        fontSize: typography.fontSizeXXLarge
      }
    }
  }
}

generator.canvas = function (variables) {
  return {
    iconEmpty: {
      color: variables['ic-brand-primary']
    },
    iconFilled: {
      color: variables['ic-brand-primary']
    }
  }
}

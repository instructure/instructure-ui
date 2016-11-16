import { alpha } from '../../util/color'

export default function generator ({ colors, typography, borders, spacing, forms }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    borderColor: colors.border,
    borderRadius: borders.radiusMedium,

    color: colors.dark,
    background: colors.lightest,

    padding: `0 ${spacing.small}`,

    focus: {
      borderColor: colors.brand,
      outlineColor: alpha(colors.brand, 50)
    },

    error: {
      borderColor: colors.danger,
      outlineColor: alpha(colors.danger, 50)
    },

    placeholder: {
      color: colors.medium
    },

    small: {
      fontSize: typography.fontSizeXSmall,
      height: forms.inputHeightSmall
    },

    medium: {
      fontSize: typography.fontSizeSmall,
      height: forms.inputHeightMedium
    },

    large: {
      fontSize: typography.fontSizeMedium,
      height: forms.inputHeightLarge
    }
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],

    focus: {
      borderColor: variables['ic-brand-primary'],
      outlineColor: alpha(variables['ic-brand-primary'], 50)
    }
  }
}

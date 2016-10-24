import { alpha, darken } from '../../util/color'

export default function ({ colors, typography, spacing, forms }) {
  return {
    handle: {
      size: '1.5rem',
      background: colors.brand,
      shadowColor: darken(colors.brand, 15),

      hover: {
        background: colors.brand
      },

      focus: {
        background: colors.brand,
        outlineColor: alpha(colors.brand, 40),
        outlineWidth: '0.75em'
      }
    },

    track: {
      background: colors.medium
    },

    value: {
      background: colors.dark,
      color: colors.lightest,
      fontFamily: typography.fontFamily,
      fontWeight: typography.fontWeightNormal,

      small: {
        fontSize: typography.fontSizeXSmall,
        padding: `0 ${spacing.xSmall}`,
        lineHeight: forms.inputHeightSmall
      },

      medium: {
        fontSize: typography.fontSizeSmall,
        padding: `0 ${spacing.small}`,
        lineHeight: forms.inputHeightMedium
      },

      large: {
        fontSize: typography.fontSizeMedium,
        padding: `0 ${spacing.medium}`,
        lineHeight: forms.inputHeightLarge
      }
    }
  }
}

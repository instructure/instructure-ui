import { alpha } from '../../../util/color'

export default function ({ colors }) {
  return {
    color: colors.lightest,
    borderColor: colors.border,
    background: colors.lightest,

    checked: {
      background: colors.brand,
      borderColor: colors.brand
    },

    hover: {
      borderColor: colors.brand
    },

    focus: {
      outlineColor: alpha(colors.brand, 50)
    },

    label: {
      color: colors.dark
    }
  }
}

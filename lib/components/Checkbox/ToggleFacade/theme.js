import { alpha } from '../../../util/color'

export default function ({ colors }) {
  return {
    color: colors.lightest,
    background: colors.dark,
    borderColor: colors.dark,

    checked: {
      background: colors.success,
      borderColor: colors.success
    },

    focus: {
      outlineColor: alpha(colors.brand, 50)
    },

    handle: {
      background: colors.lightest
    }
  }
}

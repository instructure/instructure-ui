import { alpha } from '../../util/color'

export default function ({ colors }) {
  return {
    color: colors.dark,

    backgroundColor: colors.lightest,

    borderColor: colors.border,
    borderColorFocus: colors.brand,
    borderColorError: colors.danger,

    outlineColor: alpha(colors.brand, 50),
    outlineColorError: alpha(colors.danger, 50),

    placeholderColor: colors.medium
  }
}

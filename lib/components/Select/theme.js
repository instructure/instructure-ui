import { alpha } from '../../util/color'

export default function ({ colors }) {
  return {
    borderColor: colors.border,
    borderColorFocus: colors.brand,
    borderColorError: colors.danger,
    outlineColor: alpha(colors.brand, 50),
    outlineColorError: alpha(colors.danger, 50),
    backgroundColor: colors.lightest,
    arrowIconColor: colors.dark,
    textColor: colors.dark
  }
}

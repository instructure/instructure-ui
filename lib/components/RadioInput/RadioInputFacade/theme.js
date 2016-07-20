import { alpha, darken } from '../../../util/color'

export default function ({ borders, colors, typography }) {
  return {
    borderColor: colors.border,
    borderColorHover: colors.brand,
    outlineColorFocus: colors.brand,
    outlineColorChecked: colors.dark,
    shadowColorFocus: alpha(colors.brand, 50),
    backgroundColor: colors.lightest,

    toggleBorderRadius: borders.radiusLarge,
    toggleBgColor: colors.dark,
    toggleHandleBgColor: colors.lightest,
    toggleHandleTextColor: colors.dark,
    toggleFocusColor: alpha(colors.brand, 50),

    toggleSuccessTextColor: darken(colors.success, 15),
    toggleDangerTextColor: darken(colors.danger, 15),

    toggleTextColor: colors.lightest
  }
}

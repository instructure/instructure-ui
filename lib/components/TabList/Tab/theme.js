import { darken } from '../../../util/color'

export default function ({ colors }) {
  return {
    simpleTextColor: colors.brand,
    simpleBackgroundColorSelected: colors.lightest,
    simpleBorderColorSelected: colors.border,
    simpleTextColorSelected: colors.dark,

    minimalTextColor: colors.dark,
    minimalBorderColorHover: colors.border,
    minimalBorderColorSelected: colors.brand,

    accordionTextColor: colors.dark,
    accordionBackgroundColor: colors.light,
    accordionBorderColor: colors.border,
    accordionBackgroundColorHover: darken(colors.light, 10),
    accordionBorderColorSelected: colors.brand,
    accordionTextColorSelected: colors.lightest,
    accordionBackgroundColorSelected: colors.brand,
    accordionBorderColorFocused: colors.lightest
  }
}

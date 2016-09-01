import { alpha, darken } from '../../util/color'

export default function ({ colors }) {
  return {
    handleSize: '1.6rem',
    handleColor: colors.brand,
    handleColorHover: colors.brand,
    handleColorFocus: colors.brand,
    focusOutlineColor: alpha(colors.brand, 40),
    trackColor: colors.medium,
    handleShadowColor: darken(colors.brand, 15),
    valueBackgroundColor: colors.dark,
    valueTextColor: colors.lightest
  }
}

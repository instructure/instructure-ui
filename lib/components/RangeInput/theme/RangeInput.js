export default function ({ colors, typography }) {
  return {
    handleColor: colors.colorBrandAccent,
    handleColorHover: colors.colorFocusAccent,
    handleColorFocus: colors.colorFocusAccent,
    focusOutlineColor: colors.colorFocusTransparent,
    trackColor: colors.colorNeutralMedium,
    handleShadowColor: colors.colorNeutralTransparent,
    valueBackgroundColor: colors.colorBackgroundInverse,
    valueTextColor: colors.colorTextInverse,
    labelFontWeight: typography.fontWeightBold
  }
}

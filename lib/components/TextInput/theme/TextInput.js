export default function ({ colors, typography, borders }) {
  return {
    fontFamily: typography.fontFamilyLight,
    textColor: colors.colorText,
    backgroundColor: colors.colorBackground,
    borderColor: colors.colorNeutralMedium,
    borderColorFocus: colors.colorFocus,
    borderWidth: borders.borderWidthDefault,
    borderStyle: borders.borderStyleDefault,
    borderRadius: borders.borderRadiusMedium,
    outlineColor: colors.colorFocusTransparent,
    placeholderTextColor: colors.colorNeutralMedium,
    labelFontWeight: typography.fontWeightBold,
    borderColorError: colors.colorDanger,
    errorsTextColor: colors.colorDanger
  }
}

export default function ({ borders, colors, typography }) {
  return {
    borderStyle: borders.borderStyleDefault,
    borderRadius: borders.borderRadiusLarge,
    labelTextColor: colors.colorText,
    labelFontWeight: typography.fontWeightBold,
    labelFontFamily: typography.fontFamilyBase
  }
}

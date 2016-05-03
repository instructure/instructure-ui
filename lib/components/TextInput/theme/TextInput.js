export default function ({ borders, colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamilyBase,
    textColor: colors.colorText,
    backgroundColor: colors.colorBackground,
    borderColor: colors.colorNeutralMedium,
    borderColorFocus: colors.colorFocus,
    borderWidth: borders.borderWidthDefault,
    borderStyle: borders.borderStyleDefault,
    borderRadius: borders.borderRadiusMedium,
    outlineColor: colors.colorFocusTransparent,
    outlineColorError: colors.colorDangerTransparent,
    placeholderTextColor: colors.colorNeutralMedium,
    labelFontWeight: typography.fontWeightBold,
    fontSizeSmall: typography.fontSizeExtraSmall,
    fontSizeMedium: typography.fontSizeSmall,
    fontSizeLarge: typography.fontSizeMedium,
    borderColorError: colors.colorDangerAccent,
    errorsTextColor: colors.colorDanger,
    errorMsgTopMargin: spacing.spacingExtraSmall,
    fontSizeErrorMsgs: typography.fontSizeSmall,
    paddingSmall: spacing.spacingSmall,
    paddingMedium: spacing.spacingSmall,
    paddingLarge: spacing.spacingMedium
  }
}

export default function ({ borders, colors, spacing, typography }) {
  return {
    borderRadius: borders.borderRadiusMedium,
    borderWidth: borders.borderWidthDefault,
    borderColor: colors.colorNeutralMedium,
    borderColorFocus: colors.colorBrandAccent,
    borderColorError: colors.colorDangerAccent,
    outlineColor: colors.colorFocusTransparent,
    outlineColorError: colors.colorDangerTransparent,
    backgroundColor: colors.colorBackground,
    arrowIconColor: colors.colorTextSecondary,
    textColor: colors.colorText,
    errorMsgColor: colors.colorDanger,
    labelBottomMargin: spacing.spacingExtraSmall,
    errorMsgTopMargin: spacing.spacingExtraSmall,
    fontFamily: typography.fontFamilyBase,
    fontSizeSmall: typography.fontSizeExtraSmall,
    fontSizeMedium: typography.fontSizeSmall,
    fontSizeLarge: typography.fontSizeMedium,
    fontSizeErrorMsgs: typography.fontSizeSmall,
    labelLineHeight: typography.lineHeightCondensed,
    labelFontWeight: typography.fontWeightBold,
    paddingSmall: spacing.spacingSmall,
    paddingMedium: spacing.spacingSmall,
    paddingLarge: spacing.spacingMedium
  }
}

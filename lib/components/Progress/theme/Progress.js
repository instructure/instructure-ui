export default function ({ borders, colors, spacing, typography }) {
  return {
    barHeightSmall: spacing.spacingMedium,
    barHeightMedium: spacing.spacingLarge,
    barHeightLarge: spacing.spacingExtraLarge,
    meterColor: colors.colorBrandAccent,
    meterColorInverse: colors.colorBrandInverse,
    meterColorDone: colors.colorSuccessAccent,
    meterColorDoneInverse: colors.colorSuccessInverse,
    trackColor: colors.colorNeutralInverse,
    trackColorInverse: colors.colorBackgroundInverse,
    barTrackPadding: spacing.spacingMedium,
    fontFamily: typography.fontFamilyBase,
    fontColorPrimary: colors.colorText,
    fontColorSecondary: colors.colorTextSecondary,
    fontColorPrimaryInverse: colors.colorTextInverse,
    fontColorSecondaryInverse: colors.colorTextSecondaryInverse,
    fontSizeExtraSmall: typography.fontSizeExtraSmall,
    fontSizeSmall: typography.fontSizeSmall,
    fontSizeMedium: typography.fontSizeMedium,
    fontSizeLarge: typography.fontSizeLarge,
    fontSizeExtraLarge: typography.fontSizeExtraLarge
  }
}

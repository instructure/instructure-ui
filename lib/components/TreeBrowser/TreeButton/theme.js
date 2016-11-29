export default function ({ colors, spacing, typography, borders }) {
  return {
    hoverBackgroundColor: colors.brand,
    focusOutlineWidth: borders.widthMedium,
    focusOutlineColor: colors.brand,
    iconColor: colors.dark,
    iconsMarginRight: spacing.xSmall,
    descriptorMarginTop: spacing.xxxSmall,
    nameTextColor: colors.brand,
    descriptorTextColor: colors.dark,
    hoverTextColor: colors.lightest,
    nameFontSizeSmall: typography.fontSizeXSmall,
    nameFontSizeMedium: typography.fontSizeSmall,
    nameFontSizeLarge: typography.fontSizeMedium,
    descriptorFontSizeSmall: typography.fontSizeXSmall,
    descriptorFontSizeMedium: typography.fontSizeXSmall,
    descriptorFontSizeLarge: typography.fontSizeSmall,
    baseSpacingSmall: spacing.xSmall,
    baseSpacingMedium: spacing.small,
    baseSpacingLarge: '1rem',
    borderWidth: borders.widthSmall,
    borderColor: colors.medium,
    textLineHeight: typography.lineHeightCondensed
  }
}

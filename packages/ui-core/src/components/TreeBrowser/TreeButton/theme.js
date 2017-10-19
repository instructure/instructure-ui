export default function generator ({ colors, spacing, typography, borders }) {
  return {
    hoverBackgroundColor: colors.brand,
    focusOutlineWidth: borders.widthMedium,
    focusOutlineColor: colors.brand,
    iconColor: colors.oxford,
    iconsMarginRight: spacing.xSmall,
    descriptorMarginTop: spacing.xxxSmall,
    nameTextColor: colors.brand,
    descriptorTextColor: colors.oxford,
    hoverTextColor: colors.white,
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
    borderColor: colors.slate,
    textLineHeight: typography.lineHeightCondensed
  }
}

generator['canvas'] = function (variables) {
  return {
    iconColor: variables['ic-brand-font-color-dark'],
    hoverBackgroundColor: variables['ic-brand-primary'],
    focusOutlineColor: variables['ic-brand-primary'],
    nameTextColor: variables['ic-brand-primary'],
    descriptorTextColor: variables['ic-brand-font-color-dark']
  }
}

/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

export default function generator ({ borders, colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    paddingSmall: spacing.small,
    paddingMedium: spacing.medium,
    paddingLarge: spacing.medium,
    iconColor: colors.tiara,
    smallMargin: spacing.xSmall,
    mediumMargin: spacing.small,
    largeMargin: spacing.medium,
    iconHoverColor: colors.brand,
    backgroundColor: colors.white,
    iconHoverColorInverse: colors.white,
    buttonBorderWidth: borders.widthMedium,
    buttonBorderRadius: borders.radiusLarge,
    messageColor: colors.slate,
    messageColorClickable: colors.brand,
    messageColorInverse: colors.porcelain,
    messageFontSizeSmall: typography.fontSizeSmall,
    messageFontSizeMedium: typography.fontSizeMedium,
    messageFontSizeLarge: typography.fontSizeLarge,
    clickableActiveBg: colors.brand,
    clickableActiveText: colors.white,
    buttonBorderStyle: borders.style,
    buttonHoverBorderStyle: 'dashed'
  }
}

generator.canvas = function (variables) {
  return {
    iconHoverColor: variables['ic-brand-primary'],
    messageColorClickable: variables['ic-brand-primary']
  }
}

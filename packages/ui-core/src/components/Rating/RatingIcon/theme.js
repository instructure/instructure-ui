export default function generator ({ colors, spacing, typography }) {
  return {
    iconMargin: spacing.xxxSmall,
    iconEmptyColor: colors.brand,
    iconFilledColor: colors.brand,

    smallIconFontSize: typography.fontSizeMedium,
    mediumIconFontSize: typography.fontSizeLarge,
    largeIconFontSize: typography.fontSizeXXLarge
  }
}

generator.canvas = function (variables) {
  return {
    iconEmptyColor: variables['ic-brand-primary'],
    iconFilledColor: variables['ic-brand-primary']
  }
}

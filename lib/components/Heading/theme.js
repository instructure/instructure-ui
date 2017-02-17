export default function generator ({ borders, colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,

    h1FontSize: typography.fontSizeXXLarge,
    h1FontWeight: typography.fontWeightNormal,

    h2FontSize: typography.fontSizeXLarge,
    h2FontWeight: typography.fontWeightNormal,

    h3FontSize: typography.fontSizeLarge,
    h3FontWeight: typography.fontWeightNormal,

    h4FontSize: typography.fontSizeMedium,
    h4FontWeight: typography.fontWeightNormal,

    h5FontSize: typography.fontSizeSmall,
    h5FontWeight: typography.fontWeightNormal,

    primaryColor: colors.licorice,
    primaryInverseColor: colors.white,

    secondaryColor: colors.slate,
    secondaryInverseColor: colors.porcelain,

    brandColor: colors.brand,
    warningColor: colors.fire,

    errorColor: colors.crimson,

    successColor: colors.shamrock,

    borderPadding: spacing.xxxSmall,
    borderColor: colors.tiara,
    borderWidth: borders.widthSmall,
    borderStyle: borders.style
  }
}

generator.canvas = function (variables) {
  return {
    primaryColor: variables['ic-brand-font-color-dark'],
    brandColor: variables['ic-brand-primary']
  }
}

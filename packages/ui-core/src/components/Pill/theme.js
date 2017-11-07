export default function generator ({ borders, colors, forms, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    padding: `0 ${spacing.xSmall}`,
    height: '1.3125rem',
    background: colors.white,
    lineHeight: typography.lineHeightFit,
    textTransformStyle: 'uppercase',
    textFontSize: typography.fontSizeXSmall,
    textFontWeight: typography.fontWeightBold,
    maxWidth: '10rem',
    color: colors.slate,
    primaryColor: colors.brand,
    dangerColor: colors.crimson,
    successColor: colors.shamrock,
    borderWidth: borders.widthSmall,
    borderStyle: borders.style
  }
}

generator['canvas-a11y'] = generator['canvas-high-contrast'] = function ({ colors }) {
  return {
    color: colors.licorice,
    borderColor: colors.licorice
  }
}

generator.canvas = function (variables) {
  return {
    primaryColor: variables['ic-brand-primary']
  }
}

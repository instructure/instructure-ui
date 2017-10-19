export default function generator ({ colors, spacing, typography }) {
  return {
    fontFamily: typography.fontFamily,
    background: colors.white,
    color: colors.licorice,

    figureMargin: `0 ${spacing.small} 0 0`,
    titleMargin: `0 0 ${spacing.xSmall} 0`,

    descriptionFontSize: typography.fontSizeMedium,
    descriptionFontWeight: typography.fontWeightNormal,
    descriptionLineHeight: typography.lineHeightCondensed
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}

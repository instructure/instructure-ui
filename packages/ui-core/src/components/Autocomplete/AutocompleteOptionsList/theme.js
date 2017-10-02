import { darken } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, typography, borders, spacing, stacking, forms }) {
  return {
    zIndex: stacking.topmost,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,

    labelColor: colors.oxford,
    background: colors.white,

    highlightedBackground: colors.brand,
    activeBackground: darken(colors.brand, 10),
    activeLabelColor: colors.white,

    padding: `${spacing.xSmall} ${spacing.small}`,

    smallFontSize: typography.fontSizeSmall,
    mediumFontSize: typography.fontSizeMedium,
    largeFontSize: typography.fontSizeLarge
  }
}

generator.canvas = function (variables) {
  return {
    labelColor: variables['ic-brand-font-color-dark'],
    activeBackground: darken(variables['ic-brand-primary'], 10),
    highlightedBackground: variables['ic-brand-primary']
  }
}

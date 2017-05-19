import { lighten } from '../../util/color'

/* Global variables (colors, typography, spacing, etc.) are defined in lib/themes */

export default function generator ({ colors, spacing, typography, stacking, forms }) {
  return {
    listZIndex: stacking.topmost,

    padding: `${spacing.xSmall} ${spacing.small}`,

    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,

    labelColor: colors.oxford,
    background: colors.white,

    highlightedBackground: lighten(colors.brand, 12),
    activeBackground: colors.brand,
    activeLabelColor: colors.white,

    smallFontSize: typography.fontSizeXSmall,
    mediumFontSize: typography.fontSizeSmall,
    largeFontSize: typography.fontSizeMedium
  }
}

generator.canvas = function (variables) {
  return {
    labelColor: variables['ic-brand-font-color-dark'],
    activeBackground: variables['ic-brand-primary']
  }
}

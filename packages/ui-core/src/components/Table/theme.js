import { darken } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, typography, spacing }) {
  return {
    color: colors.oxford,
    background: colors.white,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    fontSize: typography.fontSizeMedium,
    borderColor: colors.tiara,

    headerBorderColor: darken(colors.tiara, 20),

    hoverBorderColor: colors.brand,

    captionColor: colors.oxford,
    captionFontSize: typography.fontSizeMedium,

    smallFontSize: typography.fontSizeSmall,
    smallLineHeight: typography.lineHeightFit,
    smallPadding: `${spacing.xxSmall} ${spacing.xSmall}`,

    mediumFontSize: typography.fontSizeMedium,
    mediumLineHeight: typography.lineHeightCondensed,
    mediumPadding: `${spacing.xSmall} ${spacing.small}`,

    largeFontSize: typography.fontSizeLarge,
    largeLineHeight: typography.lineHeightCondensed,
    largePadding: `${spacing.small} ${spacing.medium}`,

    stripedBackground: colors.porcelain
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    captionColor: variables['ic-brand-font-color-dark'],
    hoverBorderColor: variables['ic-brand-primary']
  }
}

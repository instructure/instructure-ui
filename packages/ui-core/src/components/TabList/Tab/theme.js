import { darken } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, typography, spacing }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,
    fontSize: typography.fontSizeMedium,

    accordionPadding: `${spacing.xSmall} ${spacing.small}`,
    accordionColor: colors.oxford,
    accordionBackground: colors.porcelain,
    accordionBorderColor: colors.tiara,
    accordionHoverBackground: darken(colors.porcelain, 10),
    accordionSelectedBorderColor: colors.brand,
    accordionSelectedColor: colors.white,
    accordionSelectedBackground: colors.brand,
    accordionFocusedBorderColor: colors.white,

    simpleColor: colors.brand,
    simpleSelectedBackground: colors.white,
    simpleSelectedBorderColor: colors.tiara,
    simpleSelectedColor: colors.oxford,

    minimalColor: colors.oxford,
    minimalHoverBorderColor: colors.tiara,
    minimalSelectedBorderColor: colors.brand
  }
}

generator.canvas = function (variables) {
  return {
    accordionColor: variables['ic-brand-font-color-dark'],
    accordionSelectedBackground: variables['ic-brand-primary'],

    simpleColor: variables['ic-brand-primary'],
    simpleSelectedColor: variables['ic-brand-font-color-dark'],

    minimalColor: variables['ic-brand-font-color-dark'],
    minimalSelectedBorderColor: variables['ic-brand-primary']
  }
}

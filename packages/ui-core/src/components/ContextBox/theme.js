import { darken } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, borders, shadows }) {
  return {
    borderColor: colors.tiara,
    arrowBorderColor: darken(colors.tiara, 5),
    backgroundColor: colors.white,
    textColor: colors.oxford,

    borderColorInverse: 'transparent',
    backgroundColorInverse: colors.oxford,
    textColorInverse: colors.white,

    arrowSize: '0.5rem',
    borderWidth: borders.widthSmall,
    borderRadius: borders.radiusMedium,

    boxShadow: shadows.depth1
  }
}

generator.canvas = function (variables) {
  return {
    textColor: variables['ic-brand-font-color-dark'],
    backgroundColorInverse: variables['ic-brand-font-color-dark']
  }
}

import { darken } from '@instructure/ui-themeable/lib/utils/color'

export default function generator ({ colors, typography, borders }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    color: colors.brand,
    textDecoration: 'none',
    hoverColor: darken(colors.brand, 10),
    hoverTextDecoration: 'underline',
    outlineWidth: borders.widthSmall,
    outlineColor: 'transparent',
    outlineStyle: borders.style,
    focusOutlineColor: 'transparent',

    colorInverse: colors.porcelain
  }
}

generator['canvas-a11y'] = function ({ colors }) {
  return {
    textDecoration: 'underline',
    focusOutlineColor: colors.brand
  }
}

generator['canvas'] = function (variables) {
  return {
    color: variables['ic-link-color'],
    hoverColor: darken(variables['ic-link-color'], 10)
  }
}

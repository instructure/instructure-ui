import { darken } from '../../util/color'

export default function generator ({ colors, typography, borders }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    color: colors.brand,
    textDecoration: 'none',
    hoverColor: darken(colors.brand, 10),
    hoverTextDecoration: 'underline',
    outlineWidth: borders.widthSmall,
    outlineOffset: borders.widthSmall,
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    focusOutlineColor: 'transparent'
  }
}

generator['a11y'] = generator['canvas-a11y'] = generator['modern-a11y'] = function ({ colors }) {
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

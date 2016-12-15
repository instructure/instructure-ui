import { darken } from '../../util/color'

export default function generator ({ colors, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    color: colors.brand,
    textDecoration: 'none',
    hoverColor: darken(colors.brand, 10),
    hoverTextDecoration: 'underline'
  }
}

generator['a11y'] = generator['canvas-a11y'] = generator['modern-a11y'] = function (variables) {
  return {
    textDecoration: 'underline'
  }
}

generator['canvas'] = function (variables) {
  return {
    color: variables['ic-link-color'],
    hoverColor: darken(variables['ic-link-color'], 10)
  }
}

import { darken } from '../../util/color'

export default function generator ({ colors, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,

    color: colors.brand,
    textDecoration: 'none',
    hover: {
      color: darken(colors.brand, 10),
      textDecoration: 'underline'
    }
  }
}

generator.a11y = function (brand) {
  return {
    ...generator(brand),
    textDecoration: 'underline'
  }
}

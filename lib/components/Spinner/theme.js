export default function generator ({ colors }) {
  return {
    trackColor: colors.porcelain,
    color: colors.brand,

    smallSize: '3em',
    smallBorderWidth: '0.375em',

    mediumSize: '5em',
    mediumBorderWidth: '0.5em',

    largeSize: '7em',
    largeBorderWidth: '0.75em',

    inverseTrackColor: colors.darkest,
    inverseColor: colors.brand
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-primary']
  }
}

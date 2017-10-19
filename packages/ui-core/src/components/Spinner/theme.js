export default function generator ({ colors }) {
  return {
    trackColor: colors.porcelain,
    color: colors.brand,

    xSmallSize: '1.5em',
    xSmallBorderWidth: '0.25em',

    smallSize: '3em',
    smallBorderWidth: '0.375em',

    mediumSize: '5em',
    mediumBorderWidth: '0.5em',

    largeSize: '7em',
    largeBorderWidth: '0.75em',

    inverseTrackColor: colors.licorice,
    inverseColor: colors.brand
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-primary'],
    inverseColor: variables['ic-brand-primary'],
    inverseTrackColor: variables['ic-brand-font-color-dark']
  }
}

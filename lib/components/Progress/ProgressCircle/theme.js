const radius = {
  xSmall: 1,
  small: 1.8,
  medium: 2.75,
  large: 3.5
}

const size = {
  xSmall: 3,
  small: 5,
  medium: 7,
  large: 9
}

const circumference = function (r) {
  return (2 * Math.PI * r).toFixed(3)
}

const transform = function (s) {
  return s / 2
}

export default function generator ({ colors, typography }) {
  return {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    lineHeight: typography.lineHeightCondensed,

    xSmallSize: `${size.xSmall}em`,
    xSmallRadius: `${radius.xSmall}em`,
    xSmallCircumference: `${circumference(radius.xSmall)}em`,
    xSmallTransform: `${transform(size.xSmall)}em`,

    smallSize: `${size.small}em`,
    smallRadius: `${radius.small}em`,
    smallCircumference: `${circumference(radius.small)}em`,
    smallTransform: `${transform(size.small)}em`,

    mediumSize: `${size.medium}em`,
    mediumRadius: `${radius.medium}em`,
    mediumCircumference: `${circumference(radius.medium)}em`,
    mediumTransform: `${transform(size.medium)}em`,

    largeSize: `${size.large}em`,
    largeRadius: `${radius.large}em`,
    largeCircumference: `${circumference(radius.large)}em`,
    largeTransform: `${transform(size.large)}em`,

    color: colors.oxford,
    meterColor: colors.brand,
    doneMeterColor: colors.shamrock,
    trackColor: colors.porcelain,

    inverseColor: colors.white,
    inverseTrackColor: 'rgba(0, 0, 0, 0.25)'
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    meterColor: variables['ic-brand-primary']
  }
}

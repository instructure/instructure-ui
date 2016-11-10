const radius = {
  small: 1.8,
  medium: 2.75,
  large: 3.5
}

const size = {
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

    color: colors.dark,
    meterColor: colors.brand,
    doneMeterColor: colors.success,
    trackColor: colors.light,

    inverseColor: colors.lightest,
    inverseTrackColor: 'rgba(0, 0, 0, 0.25)'
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    meterColor: variables['ic-brand-primary']
  }
}

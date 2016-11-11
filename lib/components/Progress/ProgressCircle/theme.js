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

    small: {
      size: `${size.small}em`,
      radius: `${radius.small}em`,
      circumference: `${circumference(radius.small)}em`,
      transform: `${transform(size.small)}em`
    },

    medium: {
      size: `${size.medium}em`,
      radius: `${radius.medium}em`,
      circumference: `${circumference(radius.medium)}em`,
      transform: `${transform(size.medium)}em`
    },

    large: {
      size: `${size.large}em`,
      radius: `${radius.large}em`,
      circumference: `${circumference(radius.large)}em`,
      transform: `${transform(size.large)}em`
    },

    color: colors.dark,

    meter: {
      color: colors.brand
    },

    done: {
      meter: {
        color: colors.success
      }
    },

    track: {
      color: colors.light
    },

    inverse: {
      color: colors.lightest,
      track: {
        color: 'rgba(0, 0, 0, 0.25)'
      }
    }
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark'],
    meter: {
      color: variables['ic-brand-primary']
    }
  }
}

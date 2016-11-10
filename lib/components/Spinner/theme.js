export default function generator ({ colors }) {
  return {
    trackColor: colors.light,
    color: colors.brand,

    small: {
      size: '3em',
      borderWidth: '0.375em'
    },

    medium: {
      size: '5em',
      borderWidth: '0.5em'
    },

    large: {
      size: '7em',
      borderWidth: '0.75em'
    },

    inverse: {
      trackColor: colors.darkest,
      color: colors.brand
    }
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-primary']
  }
}

export default function generator ({ typography, colors, spacing }) {
  return {
    ...typography,

    primaryColor: colors.licorice,
    primaryInverseColor: colors.lightest,

    secondaryColor: colors.slate,
    secondaryInverseColor: colors.porcelain,

    warningColor: colors.fire,
    brandColor: colors.brand,
    errorColor: colors.crimson,
    successColor: colors.success,

    paragraphMargin: `${spacing.medium} 0`
  }
}

generator.canvas = function (variables) {
  return {
    primaryColor: variables['ic-brand-font-color-dark'],
    brandColor: variables['ic-brand-primary']
  }
}

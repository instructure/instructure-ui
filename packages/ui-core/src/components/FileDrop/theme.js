export default function generator ({ borders, colors }) {
  return {
    backgroundColor: colors.white,
    borderRadius: borders.radiusLarge,
    borderWidth: borders.widthMedium,
    hoverBorderColor: colors.brand,
    hoverBorderStyle: 'dashed',
    focusBorderStyle: 'solid',
    acceptedColor: colors.brand,
    rejectedColor: colors.crimson
  }
}

generator.canvas = function (variables) {
  return {
    hoverBorderColor: variables['ic-brand-primary'],
    acceptedColor: variables['ic-brand-primary']
  }
}

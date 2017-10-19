export default function generator ({ colors, borders, stacking }) {
  return {
    zIndex: stacking.topmost,
    background: 'rgba(255, 255, 255, 0.75)',
    borderColor: 'transparent',
    focusBorderColor: colors.brand,
    borderRadius: borders.radiusMedium,
    borderWidth: borders.widthSmall
  }
}

generator.canvas = function (variables) {
  return {
    focusBorderColor: variables['ic-brand-primary']
  }
}

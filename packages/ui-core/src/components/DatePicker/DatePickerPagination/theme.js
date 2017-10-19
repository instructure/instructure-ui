export default function generator ({ colors, typography, borders, spacing }) {
  return {
    fontSize: typography.fontSizeMedium,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightNormal,
    color: colors.oxford,
    buttonIconSize: typography.fontSizeMedium
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}

export default function generator ({ colors, borders, spacing }) {
  return {
    color: colors.oxford,
    background: colors.lightest,
    borderColor: colors.border,
    borderWidth: borders.widthSmall,
    borderStyle: borders.style,
    padding: spacing.small
  }
}

generator.canvas = function (variables) {
  return {
    color: variables['ic-brand-font-color-dark']
  }
}
